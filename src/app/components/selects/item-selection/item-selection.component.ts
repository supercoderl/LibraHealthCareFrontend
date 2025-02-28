import { Component } from "@angular/core";
import { SharedModule } from "../../../shared";

@Component({
    selector: 'libra-select-item',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div class="w-full">
            <div class="">
                <div class="relative w-full">
                    <input
                        class="default-input w-full border-gray-300 p-2 transition-all hover:border-gray-500 focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-sm"
                    />
                    <label

                        class="default-label absolute left-3 transition-all bg-white px-1 text-green-600 text-xs top-0"
                    >
                        Click
                    </label>
                </div>
                <div class="w-full">
                    <div class="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
                        <div class="flex items-center bg-gray-200 rounded-md">
                            <div class="pl-2">
                                <svg class="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path class="heroicon-ui"
                                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                </svg>
                            </div>
                            <input
                                class="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                                id="search" type="text" placeholder="Search teams or members">
                        </div>
                        <div class="py-3 text-sm">
                            <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                                <div class="flex-grow font-medium px-2">Tighten Co.</div>
                                <div class="text-sm font-normal text-gray-500 tracking-wide">Team</div>
                            </div>
                            <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                <span class="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                                <div class="flex-grow font-medium px-2">Taylor Otwell</div>
                                <div class="text-sm font-normal text-gray-500 tracking-wide">Member</div>
                            </div>
                            <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                                <div class="flex-grow font-medium px-2">Adam Wathan</div>
                                <div class="text-sm font-normal text-gray-500 tracking-wide">Member</div>
                            </div>
                            <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                                <div class="flex-grow font-medium px-2">Duke Street Studio Inc.</div>
                                <div class="text-sm font-normal text-gray-500 tracking-wide">Team</div>
                            </div>
                            <div class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                                <span class="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                                <div class="flex-grow font-medium px-2">Jeffrey Wey</div>
                                <div class="text-sm font-normal text-gray-500 tracking-wide">Member</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class ItemSelectionComponent {

}