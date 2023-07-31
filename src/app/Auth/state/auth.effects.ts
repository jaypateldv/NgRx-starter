import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { AppState } from "src/app/store/app.state";
import {
    setToastMessage,
    setLoadingSpinner,
} from "src/app/store/shared/shared.action";
import { MessageStatus } from "src/app/store/shared/shared.state";
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
                            this.store.dispatch(
                                setToastMessage({
                                    message: {
                                        message: "Login success",
                                        status: MessageStatus.SUCCESS,
                                    },
                                })
                            );
                            return loginSuccess({ user });
                        }),
                        catchError((errorResponse) => {
                            this.store.dispatch(
                                setLoadingSpinner({ status: false })
                            );
                            const errorMessage =
                                this.authService.getErrorMessage(
                                    errorResponse.error.error.message
                                );
                            return of(
                                setToastMessage({
                                    message: {
                                        message: errorMessage,
                                        status: MessageStatus.ERROR,
                                    },
                                })
                            );
                        })
                    );
            })
        );
    });
}
