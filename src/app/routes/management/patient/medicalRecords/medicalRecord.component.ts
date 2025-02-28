import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { MedicalRecord, Params, Patient } from '../../../../types';
import { OptionalService, SearchService } from '../../../../services';
import { DefaultSelectComponent } from '../../../../components/selects/default/default.component';
import { DefaultDatePickerComponent } from '../../../../components/datePickers/default/default.component';
import { ActionStatus } from '../../../../enums';
import { FilterComponent } from '../../../../components/filters/filter.component';

@Component({
  selector: 'app-medicalRecord',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultSelectComponent,
    DefaultDatePickerComponent,
    FilterComponent
  ],
  templateUrl: './medicalRecord.component.html',
})
export class MedicalRecordComponent implements OnInit {
  checked = false;
  indeterminate = false;
  medicalRecords: MedicalRecord[] = [];
  medicalRecordId: number = 0;
  modalTitle: 'Add' | 'Edit' = 'Add';
  patients: { value: number, label: string }[] = [];
  setOfCheckedId = new Set<number>();
  error = '';
  loading = false;
  totalCount: number = 0;
  params: Params = {
    pageIndex: 1,
    pageSize: 10,
    status: ActionStatus.NotDeleted
  };

  private cdr = inject(ChangeDetectorRef);
  private http = inject(_HttpClient);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });
  private searchService = inject(SearchService);

  constructor(private optionalService: OptionalService) { }

  form = inject(FormBuilder).nonNullable.group({
    patientId: [0, [Validators.required]],
    recordDate: [new Date().toDateString(), [Validators.required]],
    condition: ['', [Validators.required]],
  });

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: any): void {
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void { }

  isVisible = false;

  showModal(type: 'Add' | 'Edit', medicalRecord?: MedicalRecord | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (medicalRecord) {
      this.medicalRecordId = medicalRecord.medicalRecordId;
      this.form.setValue({
        patientId: medicalRecord.patientId,
        recordDate: new Date().toDateString(),
        condition: medicalRecord.condition
      })
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/MedicalRecord', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.medicalRecords = res?.data?.items ?? [];
        this.totalCount = res?.data?.count ?? 0;
      });
  };

  handleChangePage(pageIndex: number): void {
    this.params.pageIndex = pageIndex;
    this.onGet();
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.search(value);
  }

  handleOk(): void {
    this.error = '';
    const { condition } = this.form.controls;
    condition.markAsDirty();
    condition.updateValueAndValidity();
    if (condition.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      patientId: this.form.value.patientId,
      recordDate: new Date(this.form.value.recordDate!),
      condition: this.form.value.condition
    };

    if (this.modalTitle === 'Edit') {
      requestBody['medicalRecordId'] = this.medicalRecordId;
    }

    httpMethod('/api/v1/MedicalRecord', requestBody, {
      context: new HttpContext().set(ALLOW_ANONYMOUS, true)
    }).pipe(finalize(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })).subscribe({
      next: res => {
        //Clear routing reuse information
        this.reuseTabService?.clear();
        this.onGet();
        this.isVisible = false;
        this.form.reset();
      },
      error: err => {
        this.error = err?.error?.errors[0] ?? '';
        this.cdr.detectChanges();
      }
    });
  }

  handleCancel(): void {
    this.form.reset();
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.onGet();

    this.optionalService
      .getData('/api/v1/Patient')
      .subscribe((res: any) => {
        if (res?.data?.items && res?.data?.items.length > 0)
          this.patients = res?.data?.items.map((e: Patient) => ({ value: e.ssn, label: e.name }));
      });

    // Set up a callback to update the parameters and call OnGet()
    this.searchService.setOnSearch((query) => {
      this.params.searchTerm = query; // Update params.searchTerm
      this.onGet(); // Call API after update params
    });
  }
}
