import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";

@Component({
    selector: 'about',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
            <h4 class="text-xl text-gray-900 font-bold">About</h4>
            <p class="mt-2 text-gray-700">
            A physician's responsibility extends beyond individual care. They are
            integral parts of the healthcare system, advocating for public health,
            providing leadership in research, and pushing forward new treatments
            and advancements that can change lives. Whether it’s through
            preventive care, managing chronic conditions, or performing
            life-saving surgeries, physicians improve the quality of life for
            individuals and communities alike. Moreover, physicians work under
            tremendous pressure. They face high-stakes decisions, long hours, and
            often, emotional tolls. Yet, they remain committed to their mission of
            healing and helping others. Their resilience and unwavering dedication
            are a testament to the importance of their work and the trust that
            society places in them.
            </p>
      </div>
    `
})

export class AboutComponent { }