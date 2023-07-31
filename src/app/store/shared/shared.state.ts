export interface SharedState {
    showLoading: boolean;
    message: Message;
}

export const initialState: SharedState = {
    showLoading: false,
    // errorMessage: "",
    message: { message: "", status: null },
};

export interface Message {
    message: string;
    status: MessageStatus | null;
}

export enum MessageStatus {
    ERROR = "ERROR",
    SUCCESS = "SUCCESS",
}
