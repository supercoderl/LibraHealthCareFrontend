import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { Patient } from '../../../../types';
import { OptionalService } from '../../../../services';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  patients: Patient[] = [];
  ssn: number = 0;
  modalTitle: 'Add' | 'Edit' = 'Add';
  setOfCheckedId = new Set<number>();
  error = '';
  loading = false;

  private cdr = inject(ChangeDetectorRef);
  private http = inject(_HttpClient);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });

  constructor(private optionalService: OptionalService) { }

  form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required]],
    address: [''],
    mobile: ['', [Validators.required]],
    pcp: ['']
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

  showModal(type: 'Add' | 'Edit', patient?: Patient | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if(patient)
    {
      this.ssn = patient.ssn;
      this.form.setValue({
        name: patient.name,
        address: patient.address ?? '',
        mobile: patient.mobile,
        pcp: patient.pcp ?? ''
      })
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Patient')
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.patients = res?.data?.items ?? [];
      });
  };

  handleOk(): void {
    this.error = '';
    const { name, mobile } = this.form.controls;
    name.markAsDirty();
    name.updateValueAndValidity();
    mobile.markAsDirty();
    mobile.updateValueAndValidity();
    if (name.invalid || mobile.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      name: this.form.value.name,
      address: this.form.value.address === '' ? null : this.form.value.address,
      mobile: this.form.value.mobile,
      pcp: this.form.value.pcp === '' ? null : this.form.value.pcp
    };
    
    if (this.modalTitle === 'Edit') {
      requestBody['ssn'] = this.ssn;
    }

    httpMethod('/api/v1/Patient', requestBody, {
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
