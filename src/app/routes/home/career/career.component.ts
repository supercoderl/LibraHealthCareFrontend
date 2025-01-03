import { Component } from '@angular/core';
import { SharedModule } from '../../../shared';
import { Career } from '../../../types';
import { CAREERS } from '../../../constants';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss'
})
export class CareerComponent {
  careers: Career[] = CAREERS;
}
