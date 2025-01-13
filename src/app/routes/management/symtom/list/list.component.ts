import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { DefaultTextareaComponent } from "../../../../components/inputs/textarea/textarea.component";
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Symtom } from '../../../../types';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultTextareaComponent
  ],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  symtoms: Symtom[] = [];
  symtomId: number = 0;
  modalTitle: 'Add' | 'Edit' = 'Add';
  setOfCheckedId = new Set<number>();
  error = '';
  loading = false;

  private cdr = inject(ChangeDetectorRef);
  private http = inject(_HttpClient);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });

  form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required]],
    description: ['']
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

  showModal(type: 'Add' | 'Edit', symtom?: Symtom | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if(symtom)
    {
      this.symtomId = symtom.symtomId;
      this.form.setValue({
        name: symtom.name,
        description: symtom.description ?? ''
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Symtom')
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.symtoms = res?.data?.items ?? [];
      });
  };

  handleOk(): void {
    this.error = '';
    const { name } = this.form.controls;
    name.markAsDirty();
    name.updateValueAndValidity();
    if (name.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      name: this.form.value.name,
      description: this.form.value.description === '' ? null : this.form.value.description
    };
    
    if (this.modalTitle === 'Edit') {
      requestBody['symtomId'] = this.symtomId;
    }

    httpMethod('/api/v1/Symtom', requestBody, {
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
