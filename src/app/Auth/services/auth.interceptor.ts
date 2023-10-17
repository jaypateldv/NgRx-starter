import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
} from "@angular/common/http";
import { exhaustMap, Observable, take } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { getToken } from "../state/auth.selectors";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppState>) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return this.store.select(getToken).pipe(
            take(1),
            exhaustMap((token) => {
                if (!token) return next.handle(request);
                else {
                    return next.handle(
                        request.clone({
                            // headers: new HttpHeaders({
                            //     auth: `${token}`,
                            // }),
                            // params: request.params.append("auth", token),
                        })
                    );
                }
            })
        );
    }
}
