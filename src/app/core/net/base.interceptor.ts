import { HttpRequest } from "@angular/common/http";
import { ALLOW_ANONYMOUS } from "@delon/auth";

export function isAnonymous(req: HttpRequest<unknown>): boolean {
    return req.context.get(ALLOW_ANONYMOUS);
}