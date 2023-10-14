import { Post } from "src/app/shared/component/header/interfaces/post.interface";

export interface PostState {
    posts: Post[];
    isPostLoading: boolean;
}

export const initialState: PostState = {
    posts: [],
    isPostLoading: false,
};
