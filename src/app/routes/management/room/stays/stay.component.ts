import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { combineLatest, delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { OptionalService, SearchService } from '../../../../services';
import { DefaultSelectComponent } from '../../../../components/selects/default/default.component';
import { Stay } from '../../../../types/stay';
import { Params, Patient, Room } from '../../../../types';
import { DefaultDatePickerComponent } from '../../../../components/datePickers/default/default.component';
import { DefaultTextareaComponent } from '../../../../components/inputs/textarea/textarea.component';
import { ActionStatus } from '../../../../enums';
import { FilterComponent } from '../../../../components/filters/filter.component';

@Component({
  selector: 'app-stay',
  standalone: true,
  imports: [
    SharedModule,
    DefaultSelectComponent,
    DefaultDatePickerComponent,
    DefaultTextareaComponent,
    FilterComponent
  ],
  templateUrl: './stay.component.html',
})
export class StayComponent implements OnInit {
  checked = false;
  indeterminate = false;
  stays: Stay[] = [];
  stayId: number = 0;
  modalTitle: 'Add' | 'Edit' = 'Add';
  patients: { value: number, label: string }[] = [];
  rooms: { value: number, label: string }[] = [];
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
    roomId: [0, [Validators.required]],
    startTime: [new Date().toDateString(), [Validators.required]],
    endTime: [new Date().toDateString(), [Validators.required]],
    type: [1, [Validators.required]],
    reason: ['']
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

  showModal(type: 'Add' | 'Edit', stay?: Stay | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (stay) {
      this.stayId = stay.stayId;
      this.form.setValue({
        patientId: stay.patientId,
        roomId: stay.roomId,
        startTime: new Date().toDateString(),
        endTime: new Date().toDateString(),
        type: stay.type,
        reason: stay.reason ?? ''
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Stay', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.stays = res?.data?.items ?? [];
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
      roomId: this.form.value.roomId,
      startTime: new Date(this.form.value.startTime!),
      endTime: new Date(this.form.value.endTime!),
      reason: this.form.value.reason === '' ? null : this.form.value.reason
    };

    if (this.modalTitle === 'Edit') {
      requestBody['stayId'] = this.stayId;
    }

    httpMethod('/api/v1/Stay', requestBody, {
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
      rooms: this.optionalService.getData('/api/v1/Room'),
    }).subscribe((res: any) => {
      // Handle patients list
      if (res.patients?.data?.items && res.patients.data.items.length > 0) {
        this.patients = res.patients.data.items.map((e: Patient) => ({
          value: e.ssn,
          label: e.name,
        }));
      }

      // Handle rooms list
      if (res.rooms?.data?.items && res.rooms.data.items.length > 0) {
        this.rooms = res.rooms.data.items.map((e: Room) => ({
          value: e.roomNum,
          label: e.roomType,
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
