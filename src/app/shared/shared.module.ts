import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { RouterModule } from '@angular/router';
import { AlainThemeModule } from '@delon/theme';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { SHARED_DELON_MODULE } from './shared-delon.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgApexchartsModule } from 'ng-apexcharts';

const THIRDMODULES: Array<Type<any>> = [];

const COMPONENTS: Array<Type<any>> = [];
const DIRECTIVES: Array<Type<any>> = [];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    AlainThemeModule,
    DelonACLModule,
    DelonFormModule,
    RouterModule,
    FontAwesomeModule,
    CarouselModule,
    NgApexchartsModule,
    ...SHARED_ZORRO_MODULES,
    ...SHARED_DELON_MODULE,
    ...THIRDMODULES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule,
    AlainThemeModule,
    DelonACLModule,
    DelonFormModule,
    FontAwesomeModule,
    CarouselModule,
    NgApexchartsModule,
    ...SHARED_ZORRO_MODULES,
    ...SHARED_DELON_MODULE,
    ...THIRDMODULES,
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
