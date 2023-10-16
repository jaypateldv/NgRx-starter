import { createAction, props } from "@ngrx/store";
import { Message } from "./shared.state";

export const SET_LOADING_ACTION = "[Shared state] set loading spinner";
export const SER_ERROR_MESSAGE = "[Shared state] set error message";

export const setLoadingSpinner = createAction(
    SET_LOADING_ACTION,
    props<{ status: boolean }>()
);
export const setToastMessage = createAction(
    SER_ERROR_MESSAGE,
    props<{ message: Message }>()
);
export const dummyAction = createAction("[Dummy action]");
