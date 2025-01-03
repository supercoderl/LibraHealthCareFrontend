import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { Destroy } from "./destroy";
import { animationFrameScheduler, BehaviorSubject, combineLatest, distinctUntilChanged, endWith, interval, map, switchMap, takeUntil, takeWhile } from "rxjs";

const easeOutQuad = (x: number): number => x * (2 - x);

@Directive({
    selector: '[countUp]',
    providers: [Destroy],
    standalone: true
})

export class CountUpDirective implements OnInit {
    private readonly count$ = new BehaviorSubject(0);
    private readonly duration$ = new BehaviorSubject(2000);

    private readonly currentCount$ = combineLatest([
        this.count$,
        this.duration$
    ]).pipe(
        switchMap(([count, duration]) => {
            const startTime = animationFrameScheduler.now();

            return interval(0, animationFrameScheduler).pipe(
                map(() => animationFrameScheduler.now() - startTime),

                map((elaspedTime) => elaspedTime / duration),

                takeWhile((progress) => progress <= 1),

                map(easeOutQuad),

                map((progress) => Math.round(progress * count)),

                endWith(count),
                distinctUntilChanged()
            );
        })
    );

    @Input('countUp')
    set count(count: number) {
        this.count$.next(count);
    }

    @Input()
    set duration(duration: number) {
        this.duration$.next(duration);
    }

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        private readonly destroy$: Destroy
    ) { }

    ngOnInit(): void {
        this.displayCurrentCount();
    }

    private displayCurrentCount(): void {
        this.currentCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe((currentCount) => {
                this.renderer.setProperty(
                    this.elementRef.nativeElement,
                    'innerHTML',
                    currentCount
                );
            });
    }
}