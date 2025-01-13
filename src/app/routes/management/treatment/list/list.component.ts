import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Treatment } from '../../../../types';
import { DefaultSelectComponent } from "../../../../components/selects/default/default.component";
import { enumToList, getEnumKeyByValue } from '../../../../shared/utils';
import { TreatmentType } from '../../../../enums';

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
  treatments: Treatment[] = [];
  treatmentId: number = 0;
  types = enumToList(TreatmentType);
  setOfCheckedId = new Set<number>();
  error = '';
  loading = false;
  modalTitle: 'Add' | 'Edit' = 'Add';

  private cdr = inject(ChangeDetectorRef);
  private http = inject(_HttpClient);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });

  form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required]],
    type: [0, [Validators.required]],
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

  getLabel(value: number): string {
    return getEnumKeyByValue(TreatmentType, value) ?? '';
  }

  isVisible = false;

  showModal(type: 'Add' | 'Edit', treatment?: Treatment | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if(treatment)
    {
      this.treatmentId = treatment.treatmentId;
      this.form.setValue({
        name: treatment.name,
        type: treatment.type,
        description: treatment.description ?? ''
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Treatment')
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.treatments = res?.data?.items ?? [];
      });
  };

  handleOk(): void {
    this.error = '';
    const { name, type } = this.form.controls;
    name.markAsDirty();
    name.updateValueAndValidity();
    type.markAsDirty();
    type.updateValueAndValidity();
    if (name.invalid || type.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      name: this.form.value.name,
      type: this.form.value.type,
      description: this.form.value.description === '' ? null : this.form.value.description
    };
    
    if (this.modalTitle === 'Edit') {
      requestBody['treatmentId'] = this.treatmentId;
    }

    httpMethod('/api/v1/Treatment', requestBody, {
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
    this.isVisible = false;
    this.form.reset();
  }

  ngOnInit(): void {
    this.onGet();
  }
}
