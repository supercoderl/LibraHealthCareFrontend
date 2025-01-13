import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { DefaultSelectComponent } from '../../../../components/selects/default/default.component';
import { DefaultDatePickerComponent } from '../../../../components/datePickers/default/default.component';
import { DefaultTextareaComponent } from '../../../../components/inputs/textarea/textarea.component';
import { Appointment, Patient, Physician } from '../../../../types';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { OptionalService } from '../../../../services';
import { FormBuilder, Validators } from '@angular/forms';
import { combineLatest, delay, finalize } from 'rxjs';
import { Nurse } from '../../../../types/nurse';

@Component({
  selector: 'app-list-appointment',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultSelectComponent,
    DefaultDatePickerComponent,
    DefaultTextareaComponent
  ],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  appointments: Appointment[] = [];
  appointmentId: number = 0;
  patients: { label: string, value: number }[] = [];
  nurses: { label: string, value: string }[] = [];
  physicians: { label: string, value: string }[] = [];
  modalTitle: 'Add' | 'Edit' = 'Add';
  listOfCurrentPageData: any[] = [];
  listOfData: any[] = [];
  setOfCheckedId = new Set<number>();
  error = '';
  loading = false;

  private cdr = inject(ChangeDetectorRef);
  private http = inject(_HttpClient);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });

  constructor(private optionalService: OptionalService) { }

  form = inject(FormBuilder).nonNullable.group({
    patientId: [0, [Validators.required]],
    preNurseId: ['', [Validators.required]],
    physicianId: ['', [Validators.required]],
    startTime: [new Date().toDateString(), [Validators.required]],
    endTime: [new Date().toDateString(), [Validators.required]],
    examinationRoom: ['', [Validators.required]],
    status: [0, [Validators.required]],
    purpose: [''],
    notes: [''],
    reminder: [new Date().toDateString(), [Validators.required]]
  });

  getPatientLabel(patientId: number): string { 
    const patient = this.patients.find(e => e.value === patientId);
    return patient ? patient.label : '';
  }

  getPhysicianLabel(physicianId: string): string { 
    const physician = this.physicians.find(e => e.value === physicianId);
    return physician ? physician.label : '';
  }

  getNurseLabel(nurseId: string): string { 
    const nurse = this.nurses.find(e => e.value === nurseId);
    return nurse ? nurse.label : '';
  }

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
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  isVisible = false;

  showModal(type: 'Add' | 'Edit', appointment?: Appointment | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (appointment) {
      this.appointmentId = appointment.appointmentId;
      this.form.reset({
        patientId: appointment.patientId,
        preNurseId: appointment.preNurseId,
        physicianId: appointment.physicianId,
        startTime: new Date().toDateString(),
        endTime: new Date().toDateString(),
        examinationRoom: appointment.examinationRoom,
        status: appointment.status,
        purpose: appointment.purpose ?? '',
        notes: appointment.notes ?? '',
        reminder: new Date().toDateString()
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Appointment')
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.appointments = res?.data?.items ?? [];
      });
  };

  handleOk(): void {
    this.error = '';
    const { patientId, preNurseId, physicianId } = this.form.controls;
    patientId.markAsDirty();
    patientId.updateValueAndValidity();
    preNurseId.markAsDirty();
    preNurseId.updateValueAndValidity();
    physicianId.markAsDirty();
    physicianId.updateValueAndValidity();

    if (patientId.invalid || preNurseId.invalid || physicianId.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      patientId: this.form.value.patientId,
      preNurseId: this.form.value.preNurseId,
      physicianId: this.form.value.physicianId,
      startTime: new Date(this.form.value.startTime!),
      endTime: new Date(this.form.value.endTime!),
      examinationRoom: this.form.value.examinationRoom,
      status: this.form.value.status,
      purpose: this.form.value.purpose === '' ? null : this.form.value.purpose,
      notes: this.form.value.notes === '' ? null : this.form.value.notes,
      reminder: new Date(this.form.value.reminder!)
    };

    if (this.modalTitle === 'Edit') {
      requestBody['appointmentId'] = this.appointmentId;
    }

    httpMethod('/api/v1/Appointment', requestBody, {
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

  trackByIdentity = (index: number, item: any) => item;

  ngOnInit(): void {
    this.onGet();

    combineLatest({
      patients: this.optionalService.getData('/api/v1/Patient'),
      physicians: this.optionalService.getData('/api/v1/Physician'),
      nurses: this.optionalService.getData('/api/v1/Nurse'),
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
    });
  }
}
