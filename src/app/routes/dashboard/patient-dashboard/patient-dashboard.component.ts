import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared';
import { PerformanceHeartRate } from './widgets/performance-heart-rate';
import { RestingHeartRate } from './widgets/resting-heart-rate';
import { MedicationTable } from './widgets/medication-table';
import { UpcommingAppointmentTable } from './widgets/upcomming-appointment';
import { PastAppointmentTable } from './widgets/past-appointment';
import { Report } from './widgets/report';
import { _HttpClient } from '@delon/theme';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { UserRole } from '../../../enums';
import { delay, finalize } from 'rxjs';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    SharedModule,
    RestingHeartRate,
    PerformanceHeartRate,
    MedicationTable,
    UpcommingAppointmentTable,
    PastAppointmentTable,
    Report
  ],
  templateUrl: './patient-dashboard.component.html'
})
export class PatientDashboardComponent implements OnInit {
  loading: boolean = false;
  data: any = null;

  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly tokenSrv = inject(DA_SERVICE_TOKEN);

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Dashboard', { role: UserRole.Guest, userId: this.tokenSrv.get()?.["userId"] })
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.data = res?.data?.dashboardData;
        console.log(res?.data?.dashboardData);
      });
  };

  ngOnInit(): void {
    this.onGet();
  }
}
