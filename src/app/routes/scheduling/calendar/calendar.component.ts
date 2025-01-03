import { Component } from '@angular/core';
import { SharedModule } from '../../../shared';
import { CalendarSearch } from './widgets/search.component';
import { CalendarMini } from './widgets/calendar-mini.component';
import { CalendarUpcomingEvent } from './widgets/upcoming-event.component';
import { CalendarHeaderContent } from './widgets/header-content.component';
import { CalendarTableEvent } from './widgets/table-event.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    SharedModule,
    CalendarSearch,
    CalendarMini,
    CalendarUpcomingEvent,
    CalendarHeaderContent,
    CalendarTableEvent
  ],
  templateUrl: './calendar.component.html',
  styles: `
    .limit-span {
      -webkit-line-clamp: 2;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
    }
  `
})
export class CalendarComponent {

}
