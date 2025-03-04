import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared';
import { PatientSurvey } from "./widgets/patient-survey";
import { AppointmentReview } from "./widgets/appointment-review";
import { AppointmentComponent } from './widgets/appointment';
import { PatientGroup } from "./widgets/patient-group";
import { TodoList } from "./widgets/todo-list";
import { NumberOfPatients } from './widgets/number-of-patients';
import { DoctorStatus } from './widgets/doctor-status';
import { _HttpClient } from '@delon/theme';
import { UserRole } from '../../../enums';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { delay, finalize } from 'rxjs';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    SharedModule,
    PatientSurvey,
    AppointmentReview,
    AppointmentComponent,
    PatientGroup,
    TodoList,
    DoctorStatus,
    NumberOfPatients
  ],
  templateUrl: './doctor-dashboard.component.html'
})
export class DoctorDashboardComponent implements OnInit {
  loading: boolean = false;
  data: any = null;

  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly tokenSrv = inject(DA_SERVICE_TOKEN);

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Dashboard', { role: UserRole.Employee, userId: this.tokenSrv.get()?.["userId"] })
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
