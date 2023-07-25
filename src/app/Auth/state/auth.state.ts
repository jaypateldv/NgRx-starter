import { User } from "src/app/shared/component/header/interfaces/user.interface";

export interface AuthState {
    user: User | null;
}

export const initialState: AuthState = {
    user: null,
};
