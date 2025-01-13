import { Component } from '@angular/core';
import { SharedModule } from '../../../shared';
import { PerformanceHeartRate } from './widgets/performance-heart-rate';
import { RestingHeartRate } from './widgets/resting-heart-rate';
import { MedicationTable } from './widgets/medication-table';
import { UpcommingAppointmentTable } from './widgets/upcomming-appointment';
import { PastAppointmentTable } from './widgets/past-appointment';
import { Report } from './widgets/report';

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
export class PatientDashboardComponent {

}
