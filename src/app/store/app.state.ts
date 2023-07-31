import { AuthReducer } from "../Auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../Auth/state/auth.selectors";
import { AuthState } from "../Auth/state/auth.state";
import { counterReducer } from "../counter/state/counter.reducer";
import { postsReducer } from "../posts/state/post.reducers";
import { SharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";

export interface AppState {
    [AUTH_STATE_NAME]: AuthState;
    [SHARED_STATE_NAME]: SharedState;
}

export const appReducer = {
    [SHARED_STATE_NAME]: SharedReducer,
    [AUTH_STATE_NAME]:AuthReducer
};
