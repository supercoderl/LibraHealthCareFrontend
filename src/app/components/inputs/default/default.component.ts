import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { SharedModule } from '../../../shared';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'libra-input',
  standalone: true,
  imports: [SharedModule],
  template: `
    <input
      class="default-input h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-sm"
      [formControlName]="args['formControlName']"
    />
    <label
      for="{{args['id'] ?? ''}}"
      class="default-label absolute left-3 transition-all bg-white px-1 text-green-600 text-xs top-0"
    >
      {{text}}
    </label>
  `,
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective}
  ]
})
export class DefaultInputComponent implements AfterViewInit {
  @Input() text: string = '';
  @Input() args: { [key: string]: any } = {};

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const inputElement = this.el.nativeElement.querySelector('input');
    Object.keys(this.args).forEach((key) => {
      this.renderer.setAttribute(inputElement, key, this.args[key]);
    });
  }
}
