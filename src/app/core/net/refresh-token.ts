import { HttpClient, HttpHandlerFn, HttpRequest, HttpResponseBase } from "@angular/common/http";
import { APP_INITIALIZER, Injector, Provider } from "@angular/core";
import { DA_SERVICE_TOKEN } from "@delon/auth";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { toLogin } from "./helper";

let refreshToking = false;
let refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

/**
 * Reattach new Token information
 */

function reAttachToken(injector: Injector, req: HttpRequest<any>): HttpRequest<any> {
    const token = injector.get(DA_SERVICE_TOKEN).get()?.token;

    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
}

function refreshTokenRequest(injector: Injector): Observable<any> {
    const model = injector.get(DA_SERVICE_TOKEN).get();
    return injector.get(HttpClient).post(`/api/v1/User/logout-or-refresh`, {
        refreshToken: model?.['refresh'] || '',
        action: 'refresh'
    });
}

export function tryRefreshToken(injector: Injector, ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
    // 1. If the request is a refresh token request, it means that you can directly jump to the login page from the refresh token.
    if ([`/api/v1/User/logout-or-refresh`].some(url => req.url.includes(url))) {
        toLogin(injector);
        return throwError(() => ev);
    }
    // 2. If `refreshToking` is `true`, it means that the request to refresh the Token is already in the request, and all subsequent requests will enter the waiting state until the result is returned before reinitiating the request.
    if (refreshToking) {
        return refreshToken$.pipe(
            filter(v => !!v),
            take(1),
            switchMap(() => next(reAttachToken(injector, req)))
        );
    }
    // 3. Try to call refresh Token
    refreshToking = true;
    refreshToken$.next(null);

    return refreshTokenRequest(injector).pipe(
        switchMap(res => {
            // Notify subsequent requests to continue execution
            refreshToking = false;
            refreshToken$.next(res);
            //Resave the new token
            injector.get(DA_SERVICE_TOKEN).set(res);
            // Re-initiate the request
            return next(reAttachToken(injector, req));
        }),
        catchError(err => {
            refreshToking = false;
            toLogin(injector);
            return throwError(() => err);
        })
    );
}

function buildAuthRequest(injector: Injector) {
    const tokenSrv = injector.get(DA_SERVICE_TOKEN);
    const expired = tokenSrv.get()?.expired ?? 0; // Giả sử expired là timestamp (milliseconds)
    const twoDaysInMs = 2 * 24 * 60 * 60 * 1000; // 2 ngày tính bằng milliseconds

    if (expired && (Date.now() - expired) >= twoDaysInMs) {
        tokenSrv.clear();
    }
    else {
        tokenSrv.refresh
            .pipe(
                filter(() => !refreshToking),
                switchMap(() => {
                    refreshToking = true;
                    return refreshTokenRequest(injector);
                })
            )
            .subscribe({
                next: res => {
                    res.expired = +new Date() + 1000 * 60 * 5;
                    refreshToking = false;
                    tokenSrv.set({
                        token: res?.data?.accessToken,
                        refresh: res?.data?.refreshToken,
                        expired: res?.data?.expiredTime,
                        userId: res?.data?.userId
                    });
                },
                error: () => toLogin(injector)
            });
    }
}

export function provideBindAuthRefresh(): Provider[] {
    return [
        {
            provide: APP_INITIALIZER,
            useFactory: (injector: Injector) => () => buildAuthRequest(injector),
            deps: [Injector],
            multi: true
        }
    ];
}