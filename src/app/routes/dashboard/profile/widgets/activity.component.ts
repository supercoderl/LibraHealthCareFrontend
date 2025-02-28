import { Component } from "@angular/core";
import { SharedModule } from "../../../../shared";

@Component({
    selector: 'activity',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div class="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
            <h4 class="text-xl text-gray-900 font-bold">Activity log</h4>
            <div class="relative px-4">
            <div
                class="absolute h-full border border-dashed border-opacity-20 border-secondary"
            ></div>

            <!-- start::Timeline item -->
            <div class="flex items-center w-full my-6 -ml-1.5">
                <div class="w-1/12 z-10">
                <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div class="w-11/12">
                <p class="text-sm">Profile informations changed.</p>
                <p class="text-xs text-gray-500">3 min ago</p>
                </div>
            </div>
            <!-- end::Timeline item -->

            <!-- start::Timeline item -->
            <div class="flex items-center w-full my-6 -ml-1.5">
                <div class="w-1/12 z-10">
                <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div class="w-11/12">
                <p class="text-sm">
                    Connected with
                    <a href="#" class="text-blue-600 font-bold">Colby Covington</a>.
                </p>
                <p class="text-xs text-gray-500">15 min ago</p>
                </div>
            </div>
            <!-- end::Timeline item -->

            <!-- start::Timeline item -->
            <div class="flex items-center w-full my-6 -ml-1.5">
                <div class="w-1/12 z-10">
                <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div class="w-11/12">
                <p class="text-sm">
                    Invoice
                    <a href="#" class="text-blue-600 font-bold">#4563</a> was
                    created.
                </p>
                <p class="text-xs text-gray-500">57 min ago</p>
                </div>
            </div>
            <!-- end::Timeline item -->

            <!-- start::Timeline item -->
            <div class="flex items-center w-full my-6 -ml-1.5">
                <div class="w-1/12 z-10">
                <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div class="w-11/12">
                <p class="text-sm">
                    Message received from
                    <a href="#" class="text-blue-600 font-bold">Cecilia Hendric</a>.
                </p>
                <p class="text-xs text-gray-500">1 hour ago</p>
                </div>
            </div>
            <!-- end::Timeline item -->

            <!-- start::Timeline item -->
            <div class="flex items-center w-full my-6 -ml-1.5">
                <div class="w-1/12 z-10">
                <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div class="w-11/12">
                <p class="text-sm">
                    New order received
                    <a href="#" class="text-blue-600 font-bold">#OR9653</a>.
                </p>
                <p class="text-xs text-gray-500">2 hours ago</p>
                </div>
            </div>
            <!-- end::Timeline item -->

            <!-- start::Timeline item -->
            <div class="flex items-center w-full my-6 -ml-1.5">
                <div class="w-1/12 z-10">
                <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div class="w-11/12">
                <p class="text-sm">
                    Message received from
                    <a href="#" class="text-blue-600 font-bold">Jane Stillman</a>.
                </p>
                <p class="text-xs text-gray-500">2 hours ago</p>
                </div>
            </div>
            <!-- end::Timeline item -->
            </div>
        </div>
    `
})

export class ActivityComponent { }