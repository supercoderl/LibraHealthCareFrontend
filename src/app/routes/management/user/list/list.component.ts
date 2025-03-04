import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Params, User } from '../../../../types';
import { ActionStatus } from '../../../../enums';
import { FilterComponent } from '../../../../components/filters/filter.component';
import { SearchService } from '../../../../services';
import { EditUserComponent } from "./widgets/edit.component";
import { AssignUserComponent } from "./widgets/assign.component";
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../../reducers';
import { ProfileActions } from '../../../../core/action';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SharedModule,
    FilterComponent,
    EditUserComponent,
    AssignUserComponent
  ],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  users: User[] = [];
  userId: string = '';
  modalTitle: 'Add' | 'Edit' | 'Assign' = 'Add';
  setOfCheckedId = new Set<number>();
  error = '';
  loading = false;
  totalCount: number = 0;
  params: Params = {
    pageIndex: 1,
    pageSize: 10,
    status: ActionStatus.NotDeleted
  };
  searchControl: FormControl<string | null> = new FormControl('');

  refreshProfile() {
    this.store.dispatch(ProfileActions.refreshProfile());
  }

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly http = inject(_HttpClient);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });
  private readonly searchService = inject(SearchService);
  private readonly store = inject(Store<{ profile: ProfileState }>);


  form = inject(FormBuilder).nonNullable.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    isActive: [1, [Validators.required]],
    avatar: ['']
  });

  roleForm = inject(FormBuilder).nonNullable.group({
    roles: [<number[]>[]]
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

  showModal(type: 'Add' | 'Edit' | 'Assign', user?: User | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (user) {
      this.userId = user.userId;
      this.form.setValue({
        userName: user.userName,
        email: user.email,
        isActive: Number(user.isActive),
        avatar: user.avatar ?? ''
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/User', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.users = res?.data?.items ?? [];
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
    if (this.modalTitle !== 'Assign') {
      const { userName, email } = this.form.controls;
      userName.markAsDirty();
      userName.updateValueAndValidity();
      email.markAsDirty();
      email.updateValueAndValidity();
      if (userName.invalid || email.invalid) return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options?: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    var requestBody: any = {
      userName: this.form.value.userName,
      email: this.form.value.email,
      password: 'Password123!',
      isActive: Boolean(this.form.value.isActive),
      isEmailConfirmed: false,
      avatar: this.form.value.avatar,
      background: null
    };

    if (this.modalTitle === 'Edit') {
      requestBody['userId'] = this.userId;
    }
    else if(this.modalTitle === 'Assign') {
      requestBody = {
        userId: this.userId,
        roleIds: this.roleForm.value.roles
      }
    }

    httpMethod(this.modalTitle !== 'Assign' ? '/api/v1/User' : '/api/v1/Role/assign', requestBody)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })).subscribe({
        next: res => {
          //Clear routing reuse information
          this.reuseTabService?.clear();
          this.onGet();
          this.isVisible = false;
          this.form.reset();
          this.refreshProfile();
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

    // Set up a callback to update the parameters and call OnGet()
    this.searchService.setOnSearch((query) => {
      this.params.searchTerm = query; // Update params.searchTerm
      this.onGet(); // Call API after update params
    });
  }
}
