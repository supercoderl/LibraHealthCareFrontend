import { HttpResponseBase } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import { NotyfService } from "../../services";

export interface ReThrowHttpError {
    body: any;
    _throw: true;
}

export const CODES_MESSAGES: { [key: number]: string } = {
    200: 'Successfully',
    201: 'Created or modified successfully',
    202: 'A request has been queued in the background',
    204: 'No content',
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    406: 'The request format is not available',
    410: 'The requested resource has been permanently deleted and will not be available again',
    422: 'A validation error occured when creating an object',
    500: 'A server error occured',
    502: 'Gateway error',
    503: 'The service is unavailable and the server is temporarily overloaded or undergoing maintance',
    504: 'Gateway timeout'
}

export function goTo(injector: Injector, url: string): void {
    setTimeout(() => injector.get(Router).navigateByUrl(url));
}

export function toLogin(injector: Injector): void {
    injector.get(NotyfService).error(`Your login has expired. Please sign in again.`);
    goTo(injector, '/login');
}

export function checkStatus(injector: Injector, ev: HttpResponseBase): void {
    if ((ev.status >= 200 && ev.status < 300 || ev.status === 401)) return;

    const errorText = CODES_MESSAGES[ev.status] || ev.statusText;
    injector.get(NotyfService).error(`Request error ${ev.status}: ${ev.url}. Detail: ${errorText}`);
}