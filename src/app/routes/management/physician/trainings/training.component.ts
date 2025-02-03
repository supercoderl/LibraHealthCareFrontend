import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { combineLatest, delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Physician, Training, Treatment, User } from '../../../../types';
import { DefaultDatePickerComponent } from '../../../../components/datePickers/default/default.component';
import { DefaultSelectComponent } from '../../../../components/selects/default/default.component';
import { OptionalService } from '../../../../services';
import { enumToList } from '../../../../shared/utils';
import { TrainingStatus } from '../../../../enums';
import { DefaultTextareaComponent } from '../../../../components/inputs/textarea/textarea.component';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultDatePickerComponent,
    DefaultTextareaComponent,
    DefaultSelectComponent
  ],
  templateUrl: './training.component.html',
})
export class TrainingComponent implements OnInit {
  checked = false;
  indeterminate = false;
  trainings: Training[] = [];
  trainingId: number = 0;
  physicians: { label: string, value: string }[] = [];
  treatments: { label: string, value: string }[] = [];
  trainingStatus = enumToList(TrainingStatus);
  modalTitle: 'Add' | 'Edit' = 'Add';
  setOfCheckedId = new Set<number>();
  error = '';
  loading = false;

  private cdr = inject(ChangeDetectorRef);
  private http = inject(_HttpClient);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });

  constructor(private optionalService: OptionalService) { }

  form = inject(FormBuilder).nonNullable.group({
    physicianId: ['', [Validators.required]],
    treatmentId: [0, [Validators.required]],
    name: ['', [Validators.required]],
    description: [''],
    institutionName: ['', [Validators.required]],
    status: [0, [Validators.required]],
    certificationDate: [new Date().toDateString()],
    certificationExpireDate: [new Date().toDateString()],
    documentUrl: ['']
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

  showModal(type: 'Add' | 'Edit', training?: Training | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (training) {
      this.trainingId = training.trainingId;
      this.form.setValue({
        physicianId: training.physicianId,
        treatmentId: training.treatmentId,
        name: training.name,
        description: training.description ?? '',
        institutionName: training.institutionName,
        status: training.status,
        certificationDate: new Date().toDateString(),
        certificationExpireDate: new Date().toDateString(),
        documentUrl: training.documentUrl ?? ''
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Training')
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.trainings = res?.data?.items ?? [];
      });
  };

  handleOk(): void {
    this.error = '';
    const { name, institutionName } = this.form.controls;
    name.markAsDirty();
    name.updateValueAndValidity();
    institutionName.markAsDirty();
    institutionName.updateValueAndValidity();
    if (name.invalid || institutionName.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      physicianId: this.form.value.physicianId,
      treatmentId: this.form.value.treatmentId,
      name: this.form.value.name,
      description: this.form.value.description === '' ? null : this.form.value.description,
      institutionName: this.form.value.institutionName,
      status: this.form.value.status,
      certificationDate: this.form.value.certificationDate,
      certificationExpireDate: this.form.value.certificationExpireDate,
      documentUrl: this.form.value.documentUrl === '' ? null : this.form.value.documentUrl
    };

    if (this.modalTitle === 'Edit') {
      requestBody['trainingId'] = this.trainingId;
    }

    httpMethod('/api/v1/Training', requestBody, {
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

    combineLatest({
      treatments: this.optionalService.getData('/api/v1/Treatment'),
      physicians: this.optionalService.getData('/api/v1/Physician'),
    }).subscribe((res: any) => {
      // Handle treatments list
      if (res.treatments?.data?.items && res.treatments.data.items.length > 0) {
        this.treatments = res.treatments.data.items.map((e: Treatment) => ({
          value: e.treatmentId,
          label: e.name,
        }));
      }

      // Handle physicians list
      if (res.physicians?.data?.items && res.physicians.data.items.length > 0) {
        this.physicians = res.physicians.data.items.map((e: Physician) => ({
          value: e.employeeId,
          label: e.name,
        }));
      }
    });
  }
}
