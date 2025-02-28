import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Block, Params } from '../../../../types';
import { OptionalService, SearchService } from '../../../../services';
import { ActionStatus } from '../../../../enums';
import { FilterComponent } from '../../../../components/filters/filter.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    FilterComponent
  ],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  blocks: Block[] = [];
  blockId: number = 0;
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
    blockCode: [0, [Validators.required]],
    blockFloor: [0, [Validators.required]]
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

  showModal(type: 'Add' | 'Edit', block?: Block | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (block) {
      this.blockId = block.blockId,
        this.form.setValue({
          blockCode: block.blockCode,
          blockFloor: block.blockFloor
        });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Block', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.blocks = res?.data?.items ?? [];
        this.totalCount = res?.data?.count ?? 0;
      });
  };

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.search(value);
  }

  handleChangePage(pageIndex: number): void {
    this.params.pageIndex = pageIndex;
    this.onGet();
  }

  handleOk(): void {
    this.error = '';
    const { blockCode, blockFloor } = this.form.controls;
    blockCode.markAsDirty();
    blockCode.updateValueAndValidity();
    blockFloor.markAsDirty();
    blockFloor.updateValueAndValidity();

    if (blockCode.invalid || blockFloor.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      blockCode: this.form.value.blockCode,
      blockFloor: this.form.value.blockFloor
    };

    if (this.modalTitle === 'Edit') {
      requestBody['blockId'] = this.blockId;
    }

    httpMethod('/api/v1/Block', requestBody, {
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

    // Set up a callback to update the parameters and call OnGet()
    this.searchService.setOnSearch((query) => {
      this.params.searchTerm = query; // Update params.searchTerm
      this.onGet(); // Call API after update params
    });
  }
}
