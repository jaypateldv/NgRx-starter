import { createReducer, on } from "@ngrx/store";
import { addPost, deletePost, updatePost } from "./post.actions";
import { initialState } from "./post.state";

export function postsReducer(state: any, action: any) {
    return _postReducer(state, action);
}

const _postReducer = createReducer(
    initialState,
    on(addPost, (state, action) => {
        let post = { ...action.post };
        post["id"] = (state.posts.length + 1).toString();
        return { ...state, posts: [...state.posts, post] };
    }),
    on(updatePost, (state, action) => {
        let updatedPosts = state.posts.map((post) => {
            return action.post.id === post.id ? action.post : post;
        });
        return { ...state, posts: updatedPosts };
    }),
    on(deletePost, (state, action) => {
        const updatedPosts = state.posts.filter(
            (post) => post.id !== action.post.id
        );
        return { ...state, posts: updatedPosts };
    })
);