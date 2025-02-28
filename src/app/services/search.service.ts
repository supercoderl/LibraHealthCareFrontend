import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Params } from '../types';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private searchSubject = new Subject<string>();
    private onSearchCallback: ((query: string) => void) | null = null;

    constructor() {
        this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
            if (this.onSearchCallback) {
                this.onSearchCallback(query);
            }
        });
    }

    setOnSearch(callback: (query: string) => void) {
        this.onSearchCallback = callback;
    }

    search(query: string) {
        this.searchSubject.next(query);
    }
}
