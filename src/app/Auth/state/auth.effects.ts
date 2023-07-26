import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { exhaustMap, map } from "rxjs/operators";
import { AppState } from "src/app/store/app.state";
import { setLoadingSpinner } from "src/app/store/shared/shared.action";
import { AuthServiceService } from "../services/auth-service.service";
import { loginStart, loginSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthServiceService,
        private store: Store<AppState>
    ) {}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService
                    .login(action.email, action.password)
                    .pipe(
                        map((data) => {
                            this.store.dispatch(
                                setLoadingSpinner({ status: false })
                            );
                            const user = this.authService.formatUser(data);
                            this.authService.setUserInDB(user);
                            return loginSuccess({ user });
                        })
                    );
            })
        );
    });
}
