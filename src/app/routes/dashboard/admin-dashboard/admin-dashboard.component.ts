import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared';
import { AppointmentBar } from "./widgets/appointment-bar";
import { PatientBar } from "./widgets/patient-bar";
import { EarningBar } from "./widgets/earning-bar";
import { OperationBar } from './widgets/operation-bar';
import { AppointmentTable } from './widgets/appointment-table';
import { DoctorStatus } from "./widgets/doctor-status";
import { MedicationComponent } from "./widgets/medication";
import { _HttpClient } from '@delon/theme';
import { UserRole } from '../../../enums';
import { delay, finalize } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    SharedModule,
    AppointmentBar,
    OperationBar,
    PatientBar,
    EarningBar,
    AppointmentTable,
    DoctorStatus,
    MedicationComponent
  ],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  loading: boolean = false;
  data: any = null;

  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Dashboard', { role: UserRole.Administrator })
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.data = res?.data?.dashboardData;
      });
  };

  ngOnInit(): void {
    this.onGet();
  }
}
