import { Component } from '@angular/core';
import { SharedModule } from '../../../shared';
import { HomeHero } from './widgets/hero.component';
import { HomeBox } from './widgets/box.component';
import { HomeStatistic } from './widgets/statistic.component';
import { HomeDepartment } from './widgets/department.component';
import { HomeStep } from './widgets/step.component';
import { HomeBlog } from './widgets/blog.component';
import { HomePricing } from './widgets/pricing.component';
import { HomeAbout } from './widgets/about.component';
import { HomeBrand } from './widgets/brand.component';
import { HomeAppointment } from './widgets/appointment.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    HomeHero,
    HomeBox,
    HomeStatistic,
    HomeDepartment,
    HomeStep,
    HomeBlog,
    HomePricing,
    HomeAbout,
    HomeBrand,
    HomeAppointment
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
