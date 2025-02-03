import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class TimeConverter {
    formatTime(date: Date | string): string {
        const d = new Date(date);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}