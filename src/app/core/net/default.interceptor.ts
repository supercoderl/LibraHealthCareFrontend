import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponseBase } from "@angular/common/http";
import { inject, Injector } from "@angular/core";
import { mergeMap, Observable, of, throwError } from "rxjs";
import { checkStatus, ReThrowHttpError, toLogin } from "./helper";
import { environment } from "../../../environments/environment";
import { tryRefreshToken } from "./refresh-token";
import { IGNORE_BASE_URL } from "@delon/theme";

function handleData(injector: Injector, ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
    checkStatus(injector, ev);

    switch (ev.status) {
        case 200:
            break;
        case 401:
            if (environment.api.refreshTokenEnabled && environment.api.refreshTokenType === 're-request') {
                return tryRefreshToken(injector, ev, req, next);
            }
            toLogin(injector);
            break;
        case 403:
        case 404:
        case 500:
            break;
        default:
            if (ev instanceof HttpErrorResponse) {
                console.warn('Unknown errors, mostly caused by the backend not supporting cross-domain CORS or invalid configuration', ev);
            }
            break;
    }

    if (ev instanceof HttpErrorResponse) return throwError(() => ev);
    else if ((ev as unknown as ReThrowHttpError)._throw === true)
        return throwError(() => (ev as unknown as ReThrowHttpError).body);
    else return of(ev);
}

export const defaultInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    let url = req.url;
    
    if(!req.context.get(IGNORE_BASE_URL) && !url.startsWith('https://') && !url.startsWith('http://')) {
        const { baseUrl } = environment.api;
        url = baseUrl + (baseUrl.endsWith('/') && url.startsWith('/') ? url.substring(1) : url);
    }

    const newReq = req.clone({ url });

    const injector = inject(Injector);

    return next(newReq).pipe(
        mergeMap(ev => {
            if(ev instanceof HttpResponseBase)
            {
                return handleData(injector, ev, newReq, next);
            }
            return of(ev);
        })
    );
}