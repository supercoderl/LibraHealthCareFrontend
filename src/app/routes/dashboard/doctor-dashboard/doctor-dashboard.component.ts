import { Component } from '@angular/core';
import { SharedModule } from '../../../shared';
import { PatientSurvey } from "./widgets/patient-survey";
import { AppointmentReview } from "./widgets/appointment-review";
import { Appointment } from './widgets/appointment';
import { PatientGroup } from "./widgets/patient-group";
import { TodoList } from "./widgets/todo-list";
import { NumberOfPatients } from './widgets/number-of-patients';
import { DoctorStatus } from './widgets/doctor-status';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    SharedModule,
    PatientSurvey,
    AppointmentReview,
    Appointment,
    PatientGroup,
    TodoList,
    DoctorStatus,
    NumberOfPatients
],
  templateUrl: './doctor-dashboard.component.html'
})
export class DoctorDashboardComponent {

}
