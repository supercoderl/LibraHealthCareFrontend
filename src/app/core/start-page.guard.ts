import { CanActivateFn } from "@angular/router";
import { Observable } from "rxjs";

export const startPageGuard: CanActivateFn = (_, __): boolean | Observable<boolean> => {
    return true;
}