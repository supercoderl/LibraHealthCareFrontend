import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Nurse } from '../../../../types/nurse';
import { DefaultSelectComponent } from "../../../../components/selects/default/default.component";
import { enumToList, getEnumKeyByValue } from '../../../../shared/utils';
import { ActionStatus, Specialization } from '../../../../enums';
import { DefaultDatePickerComponent } from '../../../../components/datePickers/default/default.component';
import { OptionalService, SearchService } from '../../../../services';
import { Params, User } from '../../../../types';
import { FilterComponent } from '../../../../components/filters/filter.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultSelectComponent,
    DefaultDatePickerComponent,
    FilterComponent
  ],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  nurses: Nurse[] = [];
  nurseId: string = '';
  users: { label: string, value: string }[] = [];
  modalTitle: 'Add' | 'Edit' = 'Add';
  specializations = enumToList(Specialization);
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
    name: ['', [Validators.required]],
    position: ['', [Validators.required]],
    registered: [0, [Validators.required]],
    ssn: [0, [Validators.required]],
    specialization: [0, [Validators.required]],
    mobile: ['', [Validators.required]],
    userId: ['', [Validators.required]],
    address: ['', [Validators.required]],
    hiringDate: [new Date().toDateString(), [Validators.required]],
    shiftSchedule: ['', [Validators.required]]
  });

  getLabel(value: number): string {
    return getEnumKeyByValue(Specialization, value) ?? '';
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
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: any): void {
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void { }

  isVisible = false;

  showModal(type: 'Add' | 'Edit', nurse?: Nurse | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (nurse) {
      this.nurseId = nurse.nurseId;
      this.form.setValue({
        name: nurse.name,
        position: nurse.position,
        registered: Number(nurse.registered),
        ssn: nurse.ssn,
        specialization: nurse.specialization,
        mobile: nurse.mobile,
        userId: nurse.userId,
        address: nurse.address ?? '',
        hiringDate: new Date().toDateString(),
        shiftSchedule: nurse.shiftSchedule
      })
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Nurse', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.nurses = res?.data?.items ?? [];
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
    const { name, position, mobile } = this.form.controls;
    name.markAsDirty();
    name.updateValueAndValidity();
    position.markAsDirty();
    position.updateValueAndValidity();
    mobile.markAsDirty();
    mobile.updateValueAndValidity();
    if (name.invalid || position.invalid || mobile.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      name: this.form.value.name,
      position: this.form.value.position,
      registered: Boolean(this.form.value.registered),
      ssn: this.form.value.ssn,
      specialization: this.form.value.specialization,
      mobile: this.form.value.mobile,
      userId: this.form.value.userId,
      address: this.form.value.address,
      hiringDate: new Date(this.form.value.hiringDate!),
      shiftSchedule: this.form.value.shiftSchedule
    };

    if (this.modalTitle === 'Edit') {
      requestBody['nurseId'] = this.nurseId;
    }

    httpMethod('/api/v1/Nurse', requestBody, {
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
      .getData('/api/v1/User')
      .subscribe((res: any) => {
        if (res?.data?.items && res?.data?.items.length > 0)
          this.users = res?.data?.items.map((e: User) => ({ value: e.userId, label: e.email }));
      });

    // Set up a callback to update the parameters and call OnGet()
    this.searchService.setOnSearch((query) => {
      this.params.searchTerm = query; // Update params.searchTerm
      this.onGet(); // Call API after update params
    });
  }
}
