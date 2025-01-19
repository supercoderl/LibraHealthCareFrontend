import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
    providedIn: 'root', // Angular sẽ tự động cung cấp service này
})
export class NotyfService {
    private notyf = new Notyf({
        position: { x: 'right', y: 'top' },
    });

    success(message: string) {
        this.notyf.success(message);
    }

    error(message: string) {
        this.notyf.error(message);
    }
}