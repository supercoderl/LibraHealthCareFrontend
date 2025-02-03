import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'refresh-btn',
    standalone: true,
    template: `
        <button 
            class="relative outline-none rounded-sm w-40 h-10 cursor-pointer flex items-center border border-solid border-primary bg-primary overflow-hidden transition-all duration-300 hover:bg-secondary active:border active:border-solid active:border-[#006cd0] group" 
            type="button"
            (click)="refresh()"
        >
            <span class="transition-all duration-300 translate-x-[30px] text-white font-semibold group-hover:text-transparent">Refresh</span>
            <span class="transition-all duration-300 absolute translate-x-[122px] h-full w-[39px] bg-secondary flex items-center justify-center group-hover:w-[148px] group-hover:translate-x-0 group-active:bg-[#006cd0]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="svg" class="w-[20px] fill-white group-hover:animate-spin">
                    <path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z"></path>
                    <path fill="none" d="M0 0h48v48h-48z"></path>
                </svg>
            </span>
        </button>
    `
})

export class RefreshButton 
{ 
    private readonly router = inject(Router);

    refresh(): void {
        this.router.navigateByUrl('/');
    }
}