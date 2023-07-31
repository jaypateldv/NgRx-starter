import { createReducer, on } from "@ngrx/store";
import { setToastMessage, setLoadingSpinner } from "./shared.action";
import { initialState } from "./shared.state";

const _sharedReducer = createReducer(
    initialState,
    on(setLoadingSpinner, (state, action) => {
        return { ...state, showLoading: action.status };
    }),
    on(setToastMessage, (state, action) => {
        return { ...state, message: action.message };
    })
);
export function SharedReducer(state: any, action: any) {
    return _sharedReducer(state, action);
}
