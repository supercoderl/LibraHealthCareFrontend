import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { User } from '../../../../types';
import { DefaultSelectComponent } from '../../../../components/selects/default/default.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultSelectComponent
],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  users: User[] = [];
  userId: string = '';
  modalTitle: 'Add' | 'Edit' = 'Add';
  setOfCheckedId = new Set<number>();
  error = '';
  loading = false;

  private cdr = inject(ChangeDetectorRef);
  private http = inject(_HttpClient);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });

  form = inject(FormBuilder).nonNullable.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    isActive: [1, [Validators.required]],
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

  showModal(type: 'Add' | 'Edit', user?: User | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (user) {
      this.userId = user.userId;
      this.form.setValue({
        userName: user.userName,
        email: user.email,
        isActive: Number(user.isActive)
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/User')
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.users = res?.data?.items ?? [];
      });
  };

  handleOk(): void {
    this.error = '';
    const { userName, email } = this.form.controls;
    userName.markAsDirty();
    userName.updateValueAndValidity();
    email.markAsDirty();
    email.updateValueAndValidity();
    if (userName.invalid || email.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      userName: this.form.value.userName,
      email: this.form.value.email,
      password: 'Password123!',
      isActive: Boolean(this.form.value.isActive),
      isEmailConfirmed: false
    };

    if (this.modalTitle === 'Edit') {
      requestBody['userId'] = this.userId;
    }

    httpMethod('/api/v1/User', requestBody, {
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
  }
}
