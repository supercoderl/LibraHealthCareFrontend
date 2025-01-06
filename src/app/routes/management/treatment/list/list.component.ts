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
  types = enumToList(TreatmentType);
  setOfCheckedId = new Set<number>();
  error = '';
  loading = false;

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

  showModal(): void {
    this.isVisible = true;
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
    this.http.post('/api/v1/Treatment', {
      name: this.form.value.name,
      type: this.form.value.type,
      description: this.form.value.description === '' ? null : this.form.value.description
    }, null, {
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
      },
      error: err => {
        this.error = err?.error?.errors[0] ?? '';
        this.cdr.detectChanges();
      }
    });
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.onGet();
  }
}
