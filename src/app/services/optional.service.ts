import { HttpContext } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ALLOW_ANONYMOUS } from "@delon/auth";
import { _HttpClient } from "@delon/theme";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class OptionalService {
    private cache = new Map<string, BehaviorSubject<any[]>>(); // cache

    constructor(private http: _HttpClient) { }

    getData(path: string): Observable<any[]> {
        if (!this.cache.has(path)) {
            //Create a new cache if URL is not cached yet
            this.cache.set(path, new BehaviorSubject<any[]>([]));

            //Fetch data and store in the BehaviorSubject
            this.http.get<any[]>(path, null, {
                observe: 'body',
                responseType: 'json',
                context: new HttpContext().set(ALLOW_ANONYMOUS, true),
            }).pipe(
                tap((data) => {
                    const subject = this.cache.get(path);
                    if (subject) subject.next(data); // Update the cache
                })
            ).subscribe(); // Trigger HTTP call
        }

        // Return the cached data as an Observable 
        return this.cache.get(path)!.asObservable();
    }
}