import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { DefaultTextareaComponent } from "../../../../components/inputs/textarea/textarea.component";
import { FormBuilder, Validators } from '@angular/forms';
import { combineLatest, delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Appointment, Medication, Params, Patient, Physician, Prescription } from '../../../../types';
import { ActionStatus, MedicationType } from '../../../../enums';
import { OptionalService, SearchService } from '../../../../services';
import { DefaultSelectComponent } from "../../../../components/selects/default/default.component";
import { enumToList } from '../../../../shared/utils';
import { DefaultDatePickerComponent } from '../../../../components/datePickers/default/default.component';
import { FilterComponent } from '../../../../components/filters/filter.component';

@Component({
  selector: 'app-prescription',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultTextareaComponent,
    DefaultSelectComponent,
    DefaultDatePickerComponent,
    FilterComponent
  ],
  templateUrl: './prescription.component.html',
})
export class PrescriptionComponent implements OnInit {
  checked = false;
  indeterminate = false;
  prescriptions: Prescription[] = [];
  prescriptionId: number = 0;
  modalTitle: 'Add' | 'Edit' = 'Add';
  physicians: { value: number, label: string }[] = [];
  appointments: { value: number, label: string }[] = [];
  patients: { value: number, label: string }[] = [];
  medications: { value: number, label: string }[] = [];
  medicationTypes = enumToList(MedicationType);
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
    physicianId: ['', [Validators.required]],
    patientId: [0, [Validators.required]],
    medicationId: [0, [Validators.required]],
    date: [new Date().toDateString(), [Validators.required]],
    appointmentId: [0, [Validators.required]],
    dose: ['', [Validators.required]],
    frequency: ['', [Validators.required]],
    duration: [0, [Validators.required]],
    instructions: ['', [Validators.required]],
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

  showModal(type: 'Add' | 'Edit', prescription?: Prescription | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (prescription) {
      this.form.setValue({
        physicianId: prescription.physicianId,
        patientId: prescription.patientId,
        medicationId: prescription.medicationId,
        date: new Date().toDateString(),
        appointmentId: prescription.appointmentId,
        dose: prescription.dose,
        frequency: prescription.frequency,
        duration: prescription.duration,
        instructions: prescription.instructions
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Prescription', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.prescriptions = res?.data?.items ?? [];
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
    const { dose, frequency, instructions } = this.form.controls;
    dose.markAsDirty();
    dose.updateValueAndValidity();
    frequency.markAsDirty();
    frequency.updateValueAndValidity();
    instructions.markAsDirty();
    instructions.updateValueAndValidity();
    if (dose.invalid || frequency.invalid || instructions.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body) : this.http.post(url, body);

    const requestBody: any = {
      physicianId: this.form.value.physicianId,
      patientId: this.form.value.patientId,
      medicationId: this.form.value.medicationId,
      date: new Date(this.form.value.date!),
      appointmentId: this.form.value.appointmentId,
      dose: this.form.value.dose,
      frequency: this.form.value.frequency,
      duration: this.form.value.duration,
      instructions: this.form.value.instructions
    };

    if (this.modalTitle === 'Edit') {
      requestBody['prescriptionId'] = this.prescriptionId;
    }

    httpMethod('/api/v1/Prescription', requestBody).pipe(finalize(() => {
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
      medications: this.optionalService.getData('/api/v1/Medication'),
      appointments: this.optionalService.getData('/api/v1/Appointment')
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

      // Handle medications list
      if (res.medications?.data?.items && res.medications.data.items.length > 0) {
        this.medications = res.medications.data.items.map((e: Medication) => ({
          value: e.code,
          label: e.name,
        }));
      }

      // Handle appointments list
      if (res.appointments?.data?.items && res.appointments.data.items.length > 0) {
        this.appointments = res.appointments.data.items.map((e: Appointment) => ({
          value: e.appointmentId,
          label: e.examinationRoom,
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
