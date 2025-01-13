import { Component } from '@angular/core';
import { SharedModule } from '../../../shared';
import { AppointmentBar } from "./widgets/appointment-bar";
import { PatientBar } from "./widgets/patient-bar";
import { EarningBar } from "./widgets/earning-bar";
import { OperationBar } from './widgets/operation-bar';
import { AppointmentTable } from './widgets/appointment-table';
import { DoctorStatus } from "./widgets/doctor-status";
import { Operation } from "./widgets/operation";

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
    Operation
],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {
  
}
