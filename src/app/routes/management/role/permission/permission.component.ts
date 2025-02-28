import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { FormBuilder, Validators } from '@angular/forms';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Params, Permission } from '../../../../types';
import { ActionStatus } from '../../../../enums';
import { FilterComponent } from '../../../../components/filters/filter.component';
import { OptionalService, SearchService } from '../../../../services';
import { DefaultTextareaComponent } from "../../../../components/inputs/textarea/textarea.component";
import { DefaultSelectComponent } from "../../../../components/selects/default/default.component";

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    FilterComponent,
    DefaultTextareaComponent,
    DefaultSelectComponent
],
  templateUrl: './permission.component.html',
})
export class PermissionComponent implements OnInit {
  checked = false;
  indeterminate = false;
  permissions: Permission[] = [];
  properties: { label: string, value: string }[] = [];
  permissionId: number = 0;
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
  private readonly optionalService = inject(OptionalService);

  form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    description: ['', [Validators.required]],
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

  showModal(type: 'Add' | 'Edit', permission?: Permission | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (permission) {
      this.permissionId = permission.permissionId;
      this.form.setValue({
        name: permission.name,
        type: permission.type,
        description: permission.description,
      })
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Permission', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.permissions = res?.data?.items ?? [];
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
    const { name, type, description } = this.form.controls;
    name.markAsDirty();
    name.updateValueAndValidity();
    type.markAsDirty();
    type.updateValueAndValidity();
    description.markAsDirty();
    description.updateValueAndValidity();
    if (name.invalid || type.invalid || description.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body) : this.http.post(url, body);

    const requestBody: any = {
      name: this.form.value.name,
      type: this.form.value.type,
      description: this.form.value.description,
    };

    if (this.modalTitle === 'Edit') {
      requestBody['permissionId'] = this.permissionId;
    }

    httpMethod('/api/v1/Permission', requestBody).pipe(finalize(() => {
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
      .getData('/api/v1/Property')
      .subscribe((res: any) => {
        if (res?.data && res?.data.length > 0)
          this.properties = res?.data.map((e: string) => ({ value: e, label: e }));
      });

    // Set up a callback to update the parameters and call OnGet()
    this.searchService.setOnSearch((query) => {
      this.params.searchTerm = query; // Update params.searchTerm
      this.onGet(); // Call API after update params
    });
  }
}
