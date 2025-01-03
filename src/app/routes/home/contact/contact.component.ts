import { Component } from '@angular/core';
import { SharedModule } from '../../../shared';
import { ContactForm } from './widgets/form.component';
import { ContactInformation } from './widgets/information.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    SharedModule,
    ContactForm,
    ContactInformation
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
