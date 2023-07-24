import { createAction, props } from "@ngrx/store";

export const increment = createAction("increment");
export const decrement = createAction("decrement");
export const reset = createAction("reset");
export const updateText = createAction("updateText");

export const customIncrement = createAction(
    "customIncrement",
    props<{ value: number }>()
);

export const changeUserName = createAction(
    "CounterState",
    props<{ userName: string }>()
);
