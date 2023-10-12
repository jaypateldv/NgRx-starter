import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/shared/component/header/interfaces/post.interface";

export const ADD_POST_ACTION = "[posts page] add post";
export const UPDATE_POST_ACTION = "[posts page] update post";
export const DELETE_POST_ACTION = "[posts page] delete post";
export const LOAD_POSTS = "[posts page] load posts";
export const LOAD_POSTS_SUCCESS = "[posts page] load posts success";

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());

export const updatePost = createAction(
    UPDATE_POST_ACTION,
    props<{ post: Post }>()
);

export const deletePost = createAction(
    DELETE_POST_ACTION,
    props<{ post: Post }>()
);

export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(
    LOAD_POSTS_SUCCESS,
    props<{ posts: Post[] }>()
);
