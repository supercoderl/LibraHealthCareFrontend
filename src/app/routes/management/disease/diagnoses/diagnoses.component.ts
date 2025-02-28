import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { delay, finalize } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { Diagnosis, Params } from '../../../../types';
import { ActionStatus } from '../../../../enums';
import { FilterComponent } from '../../../../components/filters/filter.component';
import { SearchService } from '../../../../services';

@Component({
  selector: 'app-diagnoses',
  standalone: true,
  imports: [
    SharedModule,
    FilterComponent
  ],
  templateUrl: './diagnoses.component.html',
})
export class DiagnosesComponent implements OnInit {
  checked = false;
  indeterminate = false;
  diagnoses: Diagnosis[] = [];
  setOfCheckedId = new Set<number>();
  loading = false;
  totalCount: number = 0;
  params: Params = {
    pageIndex: 1,
    pageSize: 10,
    status: ActionStatus.NotDeleted
  };

  private cdr = inject(ChangeDetectorRef);
  private http = inject(_HttpClient);
  private searchService = inject(SearchService);

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

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Diagnosis', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.diagnoses = res?.data?.items ?? [];
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

  ngOnInit(): void {
    this.onGet();

    // Set up a callback to update the parameters and call OnGet()
    this.searchService.setOnSearch((query) => {
      this.params.searchTerm = query; // Update params.searchTerm
      this.onGet(); // Call API after update params
    });
  }
}
