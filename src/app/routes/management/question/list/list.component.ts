import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Params, Question, Symtom } from '../../../../types';
import { DefaultSelectComponent } from '../../../../components/selects/default/default.component';
import { OptionalService, SearchService } from '../../../../services';
import { ActionStatus } from '../../../../enums';
import { FilterComponent } from '../../../../components/filters/filter.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultSelectComponent,
    FilterComponent
  ],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  questions: Question[] = [];
  questionId: number = 0;
  modalTitle: 'Add' | 'Edit' = 'Add';
  symtoms: { value: number, label: string }[] = [];
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
    question: ['', [Validators.required]],
    symtoms: [<number[]>[]]
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

  showModal(type: 'Add' | 'Edit', question?: Question | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (question) {
      this.questionId = question.questionId;
      this.form.setValue({
        question: question.question,
        symtoms: question.symtoms
      });
    }
  }

  getLabel(symtomIds: number[]): string {
    const labels = this.symtoms
      .filter(symtom => symtomIds.includes(symtom.value))
      .map(symtom => symtom.label);

    return labels.join(', '); // Nối các label bằng dấu `,`
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/DiagnosticQuestion', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.questions = res?.data?.items ?? [];
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
    const { question } = this.form.controls;
    question.markAsDirty();
    question.updateValueAndValidity();
    if (question.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      question: this.form.value.question,
      symtoms: this.form.value.symtoms?.map(x => Number(x))
    };

    if (this.modalTitle === 'Edit') {
      requestBody['questionId'] = this.questionId;
    }

    httpMethod('/api/v1/DiagnosticQuestion', requestBody, {
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
      .getData('/api/v1/Symtom')
      .subscribe((res: any) => {
        if (res?.data?.items && res?.data?.items.length > 0)
          this.symtoms = res?.data?.items.map((e: Symtom) => ({ value: e.symtomId, label: e.name }));
      });

    // Set up a callback to update the parameters and call OnGet()
    this.searchService.setOnSearch((query) => {
      this.params.searchTerm = query; // Update params.searchTerm
      this.onGet(); // Call API after update params
    });
  }
}
