import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'libra-select',
  standalone: true,
  imports: [],
  template: `
    <select
      class="default-select h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-sm appearance-none"
    ></select>
    <label
      for="{{args['id'] ?? ''}}"
      class="default-label absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0"
    >
      {{text}}
    </label>
  `
})
export class DefaultSelectComponent implements AfterViewInit {
  @Input() text: string = '';
  @Input() args: { [key: string]: any } = {};

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const inputElement = this.el.nativeElement.querySelector('select');
    Object.keys(this.args).forEach((key) => {
      this.renderer.setAttribute(inputElement, key, this.args[key]);
    });
  }
}