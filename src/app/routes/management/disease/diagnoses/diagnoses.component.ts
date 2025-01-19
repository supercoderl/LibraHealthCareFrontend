import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { delay, finalize } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { Diagnosis } from '../../../../types';

@Component({
  selector: 'app-diagnoses',
  standalone: true,
  imports: [
    SharedModule,
],
  templateUrl: './diagnoses.component.html',
})
export class DiagnosesComponent implements OnInit {
  checked = false;
  indeterminate = false;
  diagnoses: Diagnosis[] = [];
  setOfCheckedId = new Set<number>();
  loading = false;

  private cdr = inject(ChangeDetectorRef);
  private http = inject(_HttpClient);

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
    this.http.get('/api/v1/Diagnosis', null, {
      context: new HttpContext().set(ALLOW_ANONYMOUS, true)      
    })
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.diagnoses = res?.data?.items ?? [];
      });
  };

  ngOnInit(): void {
    this.onGet();
  }
}
