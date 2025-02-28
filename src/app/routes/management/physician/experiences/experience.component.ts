import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { combineLatest, delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Experience, Params, Patient, Physician, Procedure, User } from '../../../../types';
import { DefaultDatePickerComponent } from '../../../../components/datePickers/default/default.component';
import { DefaultSelectComponent } from '../../../../components/selects/default/default.component';
import { OptionalService, SearchService } from '../../../../services';
import { enumToList, getEnumKeyByValue } from '../../../../shared/utils';
import { ActionStatus, ExperienceStatus } from '../../../../enums';
import { Nurse } from '../../../../types/nurse';
import { Stay } from '../../../../types/stay';
import { FilterComponent } from '../../../../components/filters/filter.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    SharedModule,
    DefaultDatePickerComponent,
    DefaultSelectComponent,
    FilterComponent
  ],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements OnInit {
  checked = false;
  indeterminate = false;
  experiences: Experience[] = [];
  experienceId: number = 0;
  patients: { label: string, value: string }[] = [];
  procedures: { label: string, value: string }[] = [];
  stays: { label: string, value: string }[] = [];
  physicians: { label: string, value: string }[] = [];
  nurses: { label: string, value: string }[] = [];
  experienceStatus = enumToList(ExperienceStatus);
  modalTitle: 'Add' | 'Edit' = 'Add';
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
    procedureId: [0, [Validators.required]],
    stayId: [0],
    date: [new Date().toDateString(), [Validators.required]],
    physicianId: ['', [Validators.required]],
    assistingNurseId: ['', [Validators.required]],
    status: [0, [Validators.required]],
    notes: [''],
    duration: [new Date().toDateString()]
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

  getLabel(value: number): string {
    return getEnumKeyByValue(ExperienceStatus, value) ?? '';
  }

  isVisible = false;

  showModal(type: 'Add' | 'Edit', experience?: Experience | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (experience) {
      this.experienceId = experience.experienceId;
      this.form.setValue({
        patientId: experience.patientId,
        procedureId: experience.procedureId,
        stayId: experience.stayId ?? 0,
        date: new Date().toDateString(),
        physicianId: experience.physicianId,
        assistingNurseId: experience.assistingNurseId,
        status: experience.status,
        notes: experience.notes ?? '',
        duration: new Date().toDateString()
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Experience', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.experiences = res?.data?.items ?? [];
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
    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      patientId: this.form.value.patientId,
      procedureId: this.form.value.procedureId,
      stayId: this.form.value.stayId === 0 ? null : this.form.value.stayId,
      date: new Date(this.form.value.date!),
      physicianId: this.form.value.physicianId,
      assistingNurseId: this.form.value.assistingNurseId,
      status: this.form.value.status,
      notes: this.form.value.notes === '' ? null : this.form.value.notes,
      duration: new Date(this.form.value.duration!)
    };

    if (this.modalTitle === 'Edit') {
      requestBody['experienceId'] = this.experienceId;
    }

    httpMethod('/api/v1/Experience', requestBody, {
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
      patients: this.optionalService.getData('/api/v1/Patient'),
      physicians: this.optionalService.getData('/api/v1/Physician'),
      nurses: this.optionalService.getData('/api/v1/Nurse'),
      stays: this.optionalService.getData('/api/v1/Stay'),
      procedures: this.optionalService.getData('/api/v1/Procedure')
    }).subscribe((res: any) => {
      // Handle patients list
      if (res.patients?.data?.items && res.patients.data.items.length > 0) {
        this.patients = res.patients.data.items.map((e: Patient) => ({
          value: e.ssn,
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

      // Handle nurses list
      if (res.nurses?.data?.items && res.nurses.data.items.length > 0) {
        this.nurses = res.nurses.data.items.map((e: Nurse) => ({
          value: e.nurseId,
          label: e.name,
        }));
      }

      // Handle stays list
      if (res.stays?.data?.items && res.stays.data.items.length > 0) {
        this.stays = res.stays.data.items.map((e: Stay) => ({
          value: e.stayId,
          label: e.roomType,
        }));
      }

      // Handle procedures list
      if (res.procedures?.data?.items && res.procedures.data.items.length > 0) {
        this.procedures = res.procedures.data.items.map((e: Procedure) => ({
          value: e.code,
          label: e.name,
        }));
      }
    });

    // Set up a callback to update the parameters and call OnGet()
    this.searchService.setOnSearch((query) => {
      this.params.searchTerm = query; // Update params.searchTerm
      this.onGet(); // Call API after update params
    });
  }
}
