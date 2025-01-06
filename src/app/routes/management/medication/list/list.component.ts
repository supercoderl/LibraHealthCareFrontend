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
import { Medication, Supplier } from '../../../../types';
import { MedicationType } from '../../../../enums';
import { OptionalService } from '../../../../services';
import { DefaultSelectComponent } from "../../../../components/selects/default/default.component";
import { enumToList } from '../../../../shared/utils';
import { DefaultDatePickerComponent } from '../../../../components/datePickers/default/default.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultTextareaComponent,
    DefaultSelectComponent,
    DefaultDatePickerComponent
],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  medications: Medication[] = [];
  suppliers: { value: number, label: string }[] = [];
  medicationTypes = enumToList(MedicationType);
  setOfCheckedId = new Set<number>();
  error = '';
  loading = false;

  private cdr = inject(ChangeDetectorRef);
  private http = inject(_HttpClient);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });

  constructor(private optionalService: OptionalService) { }

  form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    description: [''],
    type: [MedicationType.Other, [Validators.required]],
    unit: ['', [Validators.required]],
    price: [0, [Validators.required]],
    stockQuantity: [0, [Validators.required]],
    reorderLevel: [0, [Validators.required]],
    supplierId: [0, [Validators.required]],
    manifacturer: ['', [Validators.required]],
    expireDate: [(new Date()).toDateString(), [Validators.required]],
    sideEffects: [''],
    usageInstructions: [''],
    isPrescriptionRequired: [false, [Validators.required]]
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

  getLabel(supplierId: number): string { 
    const supplier = this.suppliers.find(e => e.value === supplierId);
    return supplier ? supplier.label : '';
  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Medication')
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.medications = res?.data?.items ?? [];
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
    this.http.post('/api/v1/Medication', {
      name: this.form.value.name,
      brand: this.form.value.brand,
      description: this.form.value.description === '' ? null : this.form.value.description,
      type: Number(this.form.value.type),
      price: Number(this.form.value.price),
      unit: this.form.value.unit,
      stockQuantity: Number(this.form.value.stockQuantity),
      reorderLevel: Number(this.form.value.reorderLevel),
      supplierId: Number(this.form.value.supplierId),
      manifacturer: this.form.value.manifacturer,
      expireDate: new Date(this.form.value.expireDate!),
      sideEffects: this.form.value.sideEffects === '' ? null : this.form.value.sideEffects,
      usageInstructions: this.form.value.usageInstructions === '' ? null : this.form.value.usageInstructions,
      isPrescriptionRequired: Boolean(this.form.value.isPrescriptionRequired)
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

    this.optionalService
      .getData('/api/v1/Supplier')
      .subscribe((res: any) => {
        if(res?.data?.items && res?.data?.items.length > 0)
          this.suppliers = res?.data?.items.map((e: Supplier) => ({ value: e.supplierId, label: e.name }));
      });
  }
}
