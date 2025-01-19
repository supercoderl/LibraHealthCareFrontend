import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { SharedModule } from '../../../shared';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'libra-select',
  standalone: true,
  imports: [
    SharedModule
  ],
  template: `
    <div class="relative default-input h-full w-full flex items-center border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-sm">
      <div
        class="leading-4"
      >
      {{ getSelectedLabels() || 'Select options...' }}
      </div>
      <select
        class="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
        (change)="onSelectionChange($event)"
      >
        <option value="0" disabled selected>-- Select an option --</option>
        <option 
          *ngFor="let option of options" [value]="option.value"
          [ngClass]="isMultiple && array.includes(option.value.toString()) ? 'bg-gray-500 text-white' : null"
        >
          {{ option.label }}
        </option>
      </select>
      <label
        for="{{args['id'] ?? ''}}"
        class="default-label absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0"
      >
        {{text}}
      </label>
    </div>
  `,
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class DefaultSelectComponent implements AfterViewInit {
  @Input() text: string = '';
  @Input() args: { [key: string]: any } = {};
  @Input() options: { value: string | number; label: string }[] = [];
  @Input() isMultiple?: boolean = false;
  array: any[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const inputElement = this.el.nativeElement.querySelector('select');
    Object.keys(this.args).forEach((key) => {
      this.renderer.setAttribute(inputElement, key, this.args[key]);
    });
  }

  getSelectedLabels(): string {
    const controlName = this.args['formControlName'];
    const formGroup = this.args['formGroup'];
    if (!formGroup || !controlName) return '';

    const control = formGroup.controls[controlName];
    if (!control) return '';

    const selectedValue = control.value; // Get recent value from control
    if (this.isMultiple) {
      // If multiple
      const selectedValues = selectedValue || [];
      console.log(selectedValues);
      const selectedLabels = this.options
        .filter((option) => selectedValues.map(String).includes(option.value.toString()))
        .map((option) => option.label);

      this.array = selectedValues.map(String);

      return selectedLabels.join(', ');
    } else {
      // Else
      const selectedOption = this.options.find(
        (option) => option.value.toString() === selectedValue.toString()
      );
      return selectedOption ? selectedOption.label : '';
    }
  }

  onSelectionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    // Lấy giá trị dựa trên việc `multiple` có được bật hay không
    const value = this.isMultiple
      ? selectElement.selectedOptions[0].value
      : selectElement.value;

    const controlName = this.args['formControlName'];
    const formGroup = this.args['formGroup'];

    if (formGroup && controlName) {
      const control = formGroup.controls[controlName];

      if (control) {
        if (this.isMultiple) {
          // Nếu là multiple, cập nhật giá trị là mảng
          const currentValues = control.value || [];
          const updatedValues = [...currentValues].map(String);

          if (updatedValues.includes(value)) {
            // Nếu đã tồn tại, xóa khỏi mảng
            const index = updatedValues.indexOf(value);
            updatedValues.splice(index, 1);
          } else {
            // Nếu chưa tồn tại, thêm vào mảng
            updatedValues.push(value);
          }

          this.array = updatedValues;

          control.setValue(updatedValues);
        } else {
          // Nếu không phải multiple, chỉ cập nhật giá trị đơn
          control.setValue(value);
        }
      } else {
        console.error(`Form control with name ${controlName} not found.`);
      }
    } else {
      console.error('FormGroup or formControlName is undefined.');
    }
  }
}
