import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { combineLatest, delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { DefaultSelectComponent } from '../../../../components/selects/default/default.component';
import { OptionalService, SearchService } from '../../../../services';
import { Affiliation, Department, Params, Physician } from '../../../../types';
import { ActionStatus } from '../../../../enums';
import { FilterComponent } from '../../../../components/filters/filter.component';

@Component({
  selector: 'app-affiliation',
  standalone: true,
  imports: [
    SharedModule,
    DefaultSelectComponent,
    FilterComponent
  ],
  templateUrl: './affiliation.component.html',
})
export class AffiliationComponent implements OnInit {
  checked = false;
  indeterminate = false;
  affiliations: Affiliation[] = [];
  affiliationId: number = 0;
  departments: { label: string, value: string }[] = [];
  physicians: { label: string, value: string }[] = [];
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
    departmentId: [0, [Validators.required]],
    physicianId: ['', [Validators.required]],
    primaryAffiliation: [0, [Validators.required]]
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

  showModal(type: 'Add' | 'Edit', affiliation?: Affiliation | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (affiliation) {
      this.affiliationId = affiliation.affiliationId;
      this.form.setValue({
        departmentId: affiliation.departmentId,
        physicianId: affiliation.physicianId,
        primaryAffiliation: Number(affiliation.primaryAffiliation)
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Affiliation', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.affiliations = res?.data?.items ?? [];
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
      departmentId: this.form.value.departmentId,
      physicianId: this.form.value.physicianId,
      primaryAffiliation: Boolean(Number(this.form.value.primaryAffiliation))
    };

    if (this.modalTitle === 'Edit') {
      requestBody['affiliationId'] = this.affiliationId;
    }

    httpMethod('/api/v1/Affiliation', requestBody, {
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
      departments: this.optionalService.getData('/api/v1/Department'),
      physicians: this.optionalService.getData('/api/v1/Physician'),
    }).subscribe((res: any) => {
      // Handle departments list
      if (res.departments?.data?.items && res.departments.data.items.length > 0) {
        this.departments = res.departments.data.items.map((e: Department) => ({
          value: e.departmentId,
          label: e.departmentName,
        }));
      }

      // Handle physicians list
      if (res.physicians?.data?.items && res.physicians.data.items.length > 0) {
        this.physicians = res.physicians.data.items.map((e: Physician) => ({
          value: e.employeeId,
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
