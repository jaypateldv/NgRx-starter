import { createAction, props } from "@ngrx/store";
import { User } from "src/app/shared/component/header/interfaces/user.interface";

export const LOGIN_START = "[auth page] login start";
export const LOGIN_SUCCESS = "[auth page] login success";
export const LOGIN_FAIL = "[auth page] login fail";

export const SIGNUP_START = "[auth page] sign up start";
export const SIGNUP_SUCCESS = "[auth page] sign up success";
export const SIGNUP_FAIL = "[auth page] sign up fail";
export const LOGOUT_ACTION = "[auth page] logout";

export const AUTO_LOGIN_ACTION = "[auth page] auto login";

export const loginStart = createAction(
    LOGIN_START,
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    LOGIN_SUCCESS,
    props<{ user: User; redirection: boolean }>()
);

export const signUpStart = createAction(
    SIGNUP_START,
    props<{ email: string; password: string }>()
);

export const signUpSuccess = createAction(
    SIGNUP_SUCCESS,
    props<{ user: User }>()
);

export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const autoLogout = createAction(LOGOUT_ACTION);
