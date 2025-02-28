import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { combineLatest, delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Nurse } from '../../../../types/nurse';
import { DefaultSelectComponent } from "../../../../components/selects/default/default.component";
import { enumToList, getEnumKeyByValue } from '../../../../shared/utils';
import { ActionStatus, Specialization } from '../../../../enums';
import { DefaultDatePickerComponent } from '../../../../components/datePickers/default/default.component';
import { OptionalService, SearchService } from '../../../../services';
import { Block, OnCall, Params } from '../../../../types';
import { FilterComponent } from '../../../../components/filters/filter.component';

@Component({
  selector: 'app-onCall',
  standalone: true,
  imports: [
    SharedModule,
    DefaultSelectComponent,
    DefaultDatePickerComponent,
    FilterComponent
  ],
  templateUrl: './onCall.component.html',
})
export class OnCallComponent implements OnInit {
  checked = false;
  indeterminate = false;
  onCalls: OnCall[] = [];
  onCallId: number = 0;
  nurses: { label: string, value: string }[] = [];
  blocks: { label: string, value: string }[] = [];
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
    nurseId: ['', [Validators.required]],
    blockId: [0, [Validators.required]],
    onCallStart: [new Date().toDateString(), [Validators.required]],
    onCallEnd: [new Date().toDateString(), [Validators.required]]
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

  showModal(type: 'Add' | 'Edit', onCall?: OnCall | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (onCall) {
      this.onCallId = onCall.onCallId;
      this.form.setValue({
        nurseId: onCall.nurseId,
        blockId: onCall.blockId,
        onCallStart: new Date().toDateString(),
        onCallEnd: new Date().toDateString()
      })
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/OnCall', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.onCalls = res?.data?.items ?? [];
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
      nurseId: this.form.value.nurseId,
      blockId: this.form.value.blockId,
      onCallStart: new Date(this.form.value.onCallStart!),
      onCallEnd: new Date(this.form.value.onCallEnd!)
    };

    if (this.modalTitle === 'Edit') {
      requestBody['onCallId'] = this.onCallId;
    }

    httpMethod('/api/v1/OnCall', requestBody, {
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
      nurses: this.optionalService.getData('/api/v1/Nurse'),
      blocks: this.optionalService.getData('/api/v1/Block'),
    }).subscribe((res: any) => {
      // Handle nurses list
      if (res.nurses?.data?.items && res.nurses.data.items.length > 0) {
        this.nurses = res.nurses.data.items.map((e: Nurse) => ({
          value: e.nurseId,
          label: e.name,
        }));
      }

      // Handle blocks list
      if (res.blocks?.data?.items && res.blocks.data.items.length > 0) {
        this.blocks = res.blocks.data.items.map((e: Block) => ({
          value: e.blockId,
          label: e.blockCode,
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
