import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../shared";

@Component({
    selector: 'diagnosis-process',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div class="ml-12 hidden md:block">
            <ul id="progressbar" class="relative">
                <li 
                    class="relative pb-10 before:inline-block before:content-[''] before:border-l-0.75 before:absolute before:-left-7 before:h-full before:w-full after:absolute after:top-0 after:-left-9.8 after:w-6.2 after:h-6.2 after:leading-6.5 after:border after:border-solid after:border-primary after:rounded-full after:block after:text-center after:mx-auto after:mb-2.5 after:transition"
                    [ngClass]="stage >= 2 ? 'before:border-primary after:bg-primary after:text-white' : stage >= 1 ? 'after:bg-primary after:text-white' : 'after:bg-white'"
                >
                    <a href="#">Informations</a>
                </li>
                <li 
                    class="relative pb-10 before:inline-block before:content-[''] before:border-l-0.75 before:absolute before:-left-7 before:h-full before:w-full after:absolute after:top-0 after:-left-9.8 after:w-6.2 after:h-6.2 after:leading-6.5 after:border after:border-solid after:border-primary after:rounded-full after:block after:text-center after:mx-auto after:mb-2.5"
                    [ngClass]="stage >= 3 ? 'before:border-primary after:bg-primary after:text-white' : stage >= 2 ? 'after:bg-primary after:text-white' : 'after:bg-white'"
                >
                    <a href="#">Symtoms</a>
                </li>
                <li 
                    class="relative before:inline-block before:content-[''] before:border-l-0.75 before:absolute before:-left-7 before:h-full before:w-full after:absolute after:top-0 after:-left-9.8 after:w-6.2 after:h-6.2 after:leading-6.5 after:border after:border-solid after:border-primary after:rounded-full after:block after:text-center after:mx-auto after:mb-2.5"
                    [ngClass]="stage >= 4 ? 'before:border-primary after:bg-primary after:text-white' : stage >= 3 ? 'after:bg-primary after:text-white' : 'after:bg-white'"
                >
                    <a href="#">Result</a>
                </li>
            </ul>
        </div>
    `,
    styles: `
        #progressbar {
            counter-reset: step;
        }

        #progressbar li:after {
            content: counter(step);
            counter-increment: step;
        }

        #progressbar li::before, #progressbar li::after {
            transition: border-color 0.5s ease-in-out;
        }

        #progressbar li::before {
            border: linear-gradient(to bottom, #ccc 0%, #ccc 100%);
        }
    `
})

export class DiagnosisProcess 
{ 
    @Input()
    stage!: number;
}