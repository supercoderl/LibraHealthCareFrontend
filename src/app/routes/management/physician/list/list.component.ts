import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Physician, User } from '../../../../types';
import { DefaultDatePickerComponent } from '../../../../components/datePickers/default/default.component';
import { DefaultSelectComponent } from '../../../../components/selects/default/default.component';
import { OptionalService } from '../../../../services';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultDatePickerComponent,
    DefaultSelectComponent
  ],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  physicians: Physician[] = [];
  employeeId: string = '';
  users: { label: string, value: string }[] = [];
  modalTitle: 'Add' | 'Edit' = 'Add';
  setOfCheckedId = new Set<number>();
  error = '';
  loading = false;

  private cdr = inject(ChangeDetectorRef);
  private http = inject(_HttpClient);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });

  constructor(private optionalService: OptionalService) { }

  form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required]],
    position: ['', [Validators.required]],
    mobile: ['', [Validators.required]],
    userId: ['', [Validators.required]],
    hiringDate: [new Date().toDateString(), [Validators.required]],
    ssn: [0, [Validators.required]]
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

  showModal(type: 'Add' | 'Edit', physician?: Physician | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (physician) {
      this.employeeId = physician.employeeId;
      this.form.setValue({
        name: physician.name,
        position: physician.position,
        mobile: physician.mobile,
        userId: physician.userId,
        hiringDate: new Date().toDateString(),
        ssn: physician.ssn
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Physician')
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.physicians = res?.data?.items ?? [];
      });
  };

  handleOk(): void {
    this.error = '';
    const { name, position } = this.form.controls;
    name.markAsDirty();
    name.updateValueAndValidity();
    position.markAsDirty();
    position.updateValueAndValidity();
    if (name.invalid || position.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      name: this.form.value.name,
      position: this.form.value.position,
      mobile: this.form.value.mobile,
      userId: this.form.value.userId,
      hiringDate: new Date(this.form.value.hiringDate!),
      ssn: this.form.value.ssn
    };

    if (this.modalTitle === 'Edit') {
      requestBody['employeeId'] = this.employeeId;
    }

    httpMethod('/api/v1/Physician', requestBody, {
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
  }
}
