import { createReducer, on } from "@ngrx/store";
import {
    changeUserName,
    customIncrement,
    decrement,
    increment,
    reset,
} from "./counter.action";
import { initialState } from "./counter.state";

const _counterReducer = createReducer(
    initialState,
    on(increment, (state) => {
        return { ...state, counter: state.counter + 1 };
    }),
    on(decrement, (state) => {
        return { ...state, counter: state.counter - 1 };
    }),
    on(reset, (state) => {
        return { ...state, counter: 0, userName: "Jay Patel" };
    }),
    on(customIncrement, (state, action) => {
        return { ...state, counter: state.counter + action.value };
    }),
    on(changeUserName, (state, action) => {
        return { ...state, userName: action.userName };
    })
);

export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action);
}
