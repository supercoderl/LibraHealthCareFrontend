import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { FormBuilder, Validators } from '@angular/forms';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Params, Permission, Role } from '../../../../types';
import { ActionStatus } from '../../../../enums';
import { FilterComponent } from '../../../../components/filters/filter.component';
import { NotyfService, OptionalService, SearchService } from '../../../../services';
import { EditRoleComponent } from "./widgets/edit.component";
import { DecentralizeRoleComponent } from "./widgets/decentralize.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SharedModule,
    FilterComponent,
    EditRoleComponent,
    DecentralizeRoleComponent
  ],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  roles: Role[] = [];
  role: Role | null = null;
  permissions: Permission[] = [];
  selectedPermissions: number[] = [];
  roleId: number = 1;
  modalTitle: 'Add' | 'Edit' | 'Decentralize' = 'Add';
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
  private readonly notyfService = inject(NotyfService);
  private readonly optionalService = inject(OptionalService);

  form = inject(FormBuilder).nonNullable.group({
    code: [1, [Validators.required]],
    name: ['', [Validators.required]]
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

  showModal(type: 'Add' | 'Edit' | 'Decentralize', role?: Role | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (role) {
      this.role = role;
      this.form.setValue({
        code: role.code,
        name: role.name
      })
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Role', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.roles = res?.data?.items ?? [];
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

  onSelectedPermissionsChange(arr: number[]): void {
    this.selectedPermissions = [...arr];
  }

  handleOk(): void {
    this.error = '';
    if (this.modalTitle !== 'Decentralize') {
      const { code, name } = this.form.controls;
      code.markAsDirty();
      code.updateValueAndValidity();
      name.markAsDirty();
      name.updateValueAndValidity();
      if (code.invalid || name.invalid) return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options?: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    var requestBody: any = {
      code: this.form.value.code,
      name: this.form.value.name,
    };

    if (this.modalTitle === 'Decentralize') {
      requestBody = {
        roleId: this.form.value.code,
        permissionIds: this.selectedPermissions
      };
    }

    httpMethod(this.modalTitle !== 'Decentralize' ? '/api/v1/Role' : '/api/v1/Permission/attach', requestBody).pipe(finalize(() => {
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
      .getData('/api/v1/Permission')
      .subscribe((res: any) => {
        if (res?.data?.items && res?.data?.items.length > 0)
          this.permissions = res?.data?.items;
      });

    // Set up a callback to update the parameters and call OnGet()
    this.searchService.setOnSearch((query) => {
      this.params.searchTerm = query; // Update params.searchTerm
      this.onGet(); // Call API after update params
    });
  }
}
