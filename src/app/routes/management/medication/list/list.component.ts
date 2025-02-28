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
import { Medication, Params, Supplier } from '../../../../types';
import { ActionStatus, MedicationType } from '../../../../enums';
import { OptionalService, SearchService } from '../../../../services';
import { DefaultSelectComponent } from "../../../../components/selects/default/default.component";
import { enumToList } from '../../../../shared/utils';
import { DefaultDatePickerComponent } from '../../../../components/datePickers/default/default.component';
import { FilterComponent } from '../../../../components/filters/filter.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultTextareaComponent,
    DefaultSelectComponent,
    DefaultDatePickerComponent,
    FilterComponent
  ],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  medications: Medication[] = [];
  medicationId: number = 0;
  modalTitle: 'Add' | 'Edit' = 'Add';
  suppliers: { value: number, label: string }[] = [];
  medicationTypes = enumToList(MedicationType);
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
    isPrescriptionRequired: [0, [Validators.required]]
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

  showModal(type: 'Add' | 'Edit', medication?: Medication | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (medication) {
      this.form.setValue({
        name: medication.name,
        description: medication.description ?? '',
        brand: medication.brand,
        type: medication.type,
        unit: medication.unit,
        price: medication.price,
        stockQuantity: medication.stockQuantity,
        reorderLevel: medication.reorderLevel,
        supplierId: medication.supplierId,
        manifacturer: medication.manifacturer,
        expireDate: new Date().toDateString(),
        sideEffects: medication.sideEffects ?? '',
        usageInstructions: medication.usageInstructions ?? '',
        isPrescriptionRequired: Number(medication.isPrescriptionRequired)
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Medication', this.params)
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.medications = res?.data?.items ?? [];
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
      description: this.form.value.description === '' ? null : this.form.value.description,
      brand: this.form.value.brand,
      type: this.form.value.type,
      unit: this.form.value.unit,
      price: this.form.value.price,
      stockQuantity: this.form.value.stockQuantity,
      reorderLevel: this.form.value.reorderLevel,
      supplierId: this.form.value.supplierId,
      manifacturer: this.form.value.manifacturer,
      expireDate: new Date(this.form.value.expireDate!),
      sideEffects: this.form.value.sideEffects,
      usageInstructions: this.form.value.usageInstructions,
      isPrescriptionRequired: this.form.value.isPrescriptionRequired
    };

    if (this.modalTitle === 'Edit') {
      requestBody['medicationId'] = this.medicationId;
    }

    httpMethod('/api/v1/Medication', requestBody, {
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
      .getData('/api/v1/Supplier')
      .subscribe((res: any) => {
        if (res?.data?.items && res?.data?.items.length > 0)
          this.suppliers = res?.data?.items.map((e: Supplier) => ({ value: e.supplierId, label: e.name }));
      });

    // Set up a callback to update the parameters and call OnGet()
    this.searchService.setOnSearch((query) => {
      this.params.searchTerm = query; // Update params.searchTerm
      this.onGet(); // Call API after update params
    });
  }
}
