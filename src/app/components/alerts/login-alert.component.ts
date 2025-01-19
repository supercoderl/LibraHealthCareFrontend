import { Component, inject } from "@angular/core";
import { SharedModule } from "../../shared";
import { Router } from "@angular/router";

@Component({
    selector: 'login-alert',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div 
            class="text-left inline-block w-full pt-24 pb-8 flex flex-col items-center justify-center" 
        >
            <img 
                decoding="async" 
                alt="Image" 
                src="https://res.cloudinary.com/mailmodo/image/upload/v1657890752/editor/p/2c28dec6-c21c-4385-a91f-96e9a90c404f/0990c61fd6fa0528adf36a0e80f44e1d_ub9btn.png" 
                class="w-16"
            >
            <p class="py-5 mt-4 text-center leading-5">
                <span class="text-[48px]">Authentication Required</span>
            </p>
            <div 
                class="py-3 px-4 mb-5 inline-block bg-primary text-16 leading-4 m-0 rounded-sm cursor-pointer"
                (click)="toLogin()"
            >
                <span class="text-white">Go to login</span>
            </div>
            <p class="text-center">
                <span class="text-16 text-gray-500">
                    You must log in or register first to use this function.
                </span>
            </p>
        </div>
    `
})

export class LoginAlert 
{ 
    private readonly router = inject(Router);

    toLogin(): void {
        this.router.navigateByUrl('/auth/login');
    }
}