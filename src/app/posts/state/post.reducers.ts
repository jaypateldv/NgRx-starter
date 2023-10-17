import { createReducer, on } from "@ngrx/store";
import {
    addPostSuccess,
    deletePostSuccess,
    loadPostsSuccess,
    updatePostLoader,
    updatePostSuccess,
} from "./post.actions";
import { initialState, postsAdepter } from "./post.state";

export function postsReducer(state: any, action: any) {
    return _postReducer(state, action);
}

const _postReducer = createReducer(
    initialState,
    on(addPostSuccess, (state, action) => {
        // let post = { ...action.post };
        // return { ...state, posts: [...state.posts, post] };
        return postsAdepter.addOne(action.post, {
            ...state,
            count: state.count + 1,
        });
    }),
    on(updatePostSuccess, (state, action) => {
        // let updatedPosts = state.posts.map((post) => {
        //     return action.post.id === post.id ? action.post : post;
        // });
        // return { ...state, posts: updatedPosts };
        return postsAdepter.updateOne(action.post, state);
    }),
    on(deletePostSuccess, (state, action) => {
        // const updatedPosts = state.posts.filter(
        //     (post) => post.id !== action.post.id
        // );
        // return { ...state, posts: updatedPosts };
        return postsAdepter.removeOne(action.post.id!, {
            ...state,
            count: state.count - 1,
        });
    }),
    on(loadPostsSuccess, (state, action) => {
        // return { ...state, posts: action.posts };
        return postsAdepter.setAll(action.posts, {
            ...state,
            count: action.posts.length,
        });
    }),
    on(updatePostLoader, (state, action) => {
        return { ...state, isPostLoading: action.isPostLoading };
    })
);
