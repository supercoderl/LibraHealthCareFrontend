import { Component } from '@angular/core';
import { SharedModule } from '../../../shared';
import { CareHealthLeftSide } from "./widgets/left-side.component";
import { CareHealthRightSide } from "./widgets/right-side.component";
import { CareHealthPagination } from "./widgets/pagination.component";

@Component({
  selector: 'app-care-health',
  standalone: true,
  imports: [
    SharedModule,
    CareHealthLeftSide,
    CareHealthRightSide,
    CareHealthPagination
],
  templateUrl: './care-health.component.html'
})
export class CareHealthComponent {

}
