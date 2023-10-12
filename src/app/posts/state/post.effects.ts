import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { PostService } from "src/app/Auth/services/post.service";
import {
    addPost,
    addPostSuccess,
    deletePost,
    deletePostSuccess,
    loadPosts,
    loadPostsSuccess,
    updatePost,
    updatePostSuccess,
} from "./post.actions";

@Injectable()
export class PostEffects {
    constructor(private actions$: Actions, private postService: PostService) {}

    loadPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadPosts),
            mergeMap((action) => {
                return this.postService.getPosts().pipe(
                    map((posts) => {
                        return loadPostsSuccess({ posts });
                    })
                );
            })
        );
    });

    addPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPost),
            mergeMap((action) => {
                return this.postService.addPost(action.post).pipe(
                    map((data) => {
                        const post = { ...action.post, id: data.name };
                        return addPostSuccess({ post });
                    })
                );
            })
        );
    });
    updatePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePost),
            mergeMap((action) => {
                return this.postService.updatePost(action.post).pipe(
                    map((post) => {
                        return updatePostSuccess({ post });
                    })
                );
            })
        );
    });
    deletePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePost),
            mergeMap((action) => {
                return this.postService.deletePost(action.post.id!).pipe(
                    map((post) => {
                        return deletePostSuccess({ post: action.post });
                    })
                );
            })
        );
    });
}
