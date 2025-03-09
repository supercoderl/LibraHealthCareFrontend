import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";

@Component({
    selector: 'member',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div class="flex items-center justify-between">
            <h4 class="text-xl text-gray-900 font-bold">{{ "app.dashboard.team-members" | i18n: { count: 5 } }}</h4>
            <a href="#" title="View All">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-500 hover:text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
                </svg>
            </a>
            </div>
            <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-8 mt-8"
            >
            <a
                href="#"
                class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600"
                title="View Profile"
            >
                <img
                src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection1.jpg"
                class="w-16 rounded-full"
                />
                <p class="text-center font-bold text-sm mt-1">Diane Aguilar</p>
                <p class="text-xs text-gray-500 text-center">UI/UX Design at Upwork</p>
            </a>
            <a
                href="#"
                class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600"
                title="View Profile"
            >
                <img
                src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection2.jpg"
                class="w-16 rounded-full"
                />
                <p class="text-center font-bold text-sm mt-1">Frances Mather</p>
                <p class="text-xs text-gray-500 text-center">
                Software Engineer at Facebook
                </p>
            </a>
            <a
                href="#"
                class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600"
                title="View Profile"
            >
                <img
                src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection3.jpg"
                class="w-16 rounded-full"
                />
                <p class="text-center font-bold text-sm mt-1">Carlos Friedrich</p>
                <p class="text-xs text-gray-500 text-center">
                Front-End Developer at Tailwind CSS
                </p>
            </a>
            <a
                href="#"
                class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600"
                title="View Profile"
            >
                <img
                src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection4.jpg"
                class="w-16 rounded-full"
                />
                <p class="text-center font-bold text-sm mt-1">Donna Serrano</p>
                <p class="text-xs text-gray-500 text-center">
                System Engineer at Tesla
                </p>
            </a>
            <a
                href="#"
                class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600"
                title="View Profile"
            >
                <img
                src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection5.jpg"
                class="w-16 rounded-full"
                />
                <p class="text-center font-bold text-sm mt-1">Randall Tabron</p>
                <p class="text-xs text-gray-500 text-center">
                Software Developer at Upwork
                </p>
            </a>
        </div>
    `
})

export class MemberComponent { }