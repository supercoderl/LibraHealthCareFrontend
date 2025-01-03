import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class Dimension {
    getWindowDimension(): { width: number, height: number } {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    isMobile(): boolean {
        return window.innerWidth <= 767;
    }
}