import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'libra-date-picker',
  standalone: true,
  imports: [
    SharedModule,
  ],
  template: `
    <input
      class="default-input h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-sm"
      readonly
      (click)="toggleDatepicker($event)"
      [formControlName]="args['formControlName']"
    />
    <label
      for="{{args['id'] ?? ''}}"
      class="default-label absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0"
    >
      {{text}}
    </label>
    <div
      [hidden]="!showDatepicker"
      class="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0 z-10 w-auto"
      #datepicker
    >
    <div class="flex flex-wrap justify-between items-center mb-2">
      <div>
        <span class="text-lg font-bold text-gray-800">{{MONTH_NAMES[month]}}</span>
        <span class="ml-1 text-lg text-gray-600 font-normal">{{year}}</span>
      </div>
      <div>
        <button
          type="button"
          class="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
          [ngClass]="{'cursor-not-allowed opacity-25': month === 0}"
          [disabled]="month === 0 ? true : false"
          (click)="month = month - 1"
          (click)="getNoOfDays()"
        >
          <svg
            class="h-6 w-6 text-gray-500 inline-flex"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          type="button"
          class="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
          [ngClass]="{
            'cursor-not-allowed opacity-25': month === 11
          }"
          [disabled]="month === 11 ? true : false"
          (click)="month = month + 1"
          (click)="getNoOfDays()"
        >
          <svg
            class="h-6 w-6 text-gray-500 inline-flex"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div class="flex flex-wrap mb-3 w-full">
      <ng-container *ngFor="let day of DAYS; let index = index">
        <div style="width: 14.26%" class="px-1">
          <div
            class="text-gray-800 font-medium text-center text-xs"
          >
            {{ day }}
          </div>
        </div>
      </ng-container>
    </div>

    <div class="flex flex-wrap -mx-1">
      <ng-container *ngFor="let blankday of blankdays">
        <div
          style="width: 14.28%"
          class="text-center border-none p-1 border-transparent text-sm"
        ></div>
      </ng-container>
      <ng-container
        *ngFor="
          let date of no_of_days;
          let dateIndex = index;
          trackBy: trackByIdentity
        "
      >
        <div style="width: 14.28%" class="px-1 mb-1">
          <div
            (click)="getDateValue(date)"
            class="cursor-pointer text-center text-sm rounded-full leading-loose transition ease-in-out duration-100"
            [ngClass]="{
              'bg-blue-500 text-white': isToday(date) === true,
              'text-gray-700 hover:bg-blue-200':
                isToday(date) === false
            }"
          >
            {{ date }}
          </div>
        </div>
      </ng-container>
    </div>
  </div>
    </div>
  `,
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class DefaultDatePickerComponent implements OnInit, AfterViewInit {
  @Input() text: string = '';
  @Input() args: { [key: string]: any } = {};
  @ViewChild('datepicker') datepicker?: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (this.showDatepicker && !this.datepicker?.nativeElement.contains(target)) this.showDatepicker = false;
    });
  }

  MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  showDatepicker = false;
  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];

  toggleDatepicker(event: MouseEvent) {
    // Chặn sự kiện lan truyền lên `window`
    event.stopPropagation();

    // Bật hoặc tắt hiển thị picker
    this.showDatepicker = !this.showDatepicker;
  }

  getDateValue(date: any) {
    let selectedDate = new Date(this.year, this.month, date);
    this.updateFormControlValue(selectedDate.toDateString());
    this.showDatepicker = false;
  }

  updateFormControlValue(selectedDate: string) {
    const controlName = this.args['formControlName'];
    const formGroup = this.args['formGroup'];

    if (formGroup && controlName) {
      const control = formGroup.controls[controlName];

      if (control) {
        control.setValue(selectedDate);
      } else {
        console.error(`Form control with name ${controlName} not found.`);
      }
    } else {
      console.error('FormGroup or formControlName is undefined.');
    }
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
  }

  isToday(date: any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }

  trackByIdentity = (index: number, item: any) => item;

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
  }

  ngAfterViewInit() {
    const inputElement = this.el.nativeElement.querySelector('input');
    Object.keys(this.args).forEach((key) => {
      this.renderer.setAttribute(inputElement, key, this.args[key]);
    });
  }
}
