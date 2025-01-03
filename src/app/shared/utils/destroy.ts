import { Injectable, OnDestroy } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

@Injectable()
export class Destroy extends Observable<void> implements OnDestroy {
    private readonly destroySubjects$ = new ReplaySubject<void>(1);

    constructor() {
        super((subcriber) => this.destroySubjects$.subscribe(subcriber));
    }

    ngOnDestroy(): void {
        this.destroySubjects$.next();
        this.destroySubjects$.complete();
    }
}