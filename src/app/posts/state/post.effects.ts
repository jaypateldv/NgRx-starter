import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap } from "rxjs";
import { PostService } from "src/app/Auth/services/post.service";
import { AppState } from "src/app/store/app.state";
import {
    addPost,
    addPostSuccess,
    deletePost,
    deletePostSuccess,
    loadPosts,
    loadPostsSuccess,
    updatePost,
    updatePostLoader,
    updatePostSuccess,
} from "./post.actions";

@Injectable()
export class PostEffects {
    constructor(
        private actions$: Actions,
        private postService: PostService,
        private store: Store<AppState>
    ) {}

    loadPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadPosts),
            mergeMap((action) => {
                this.store.dispatch(updatePostLoader({ isPostLoading: true }));
                return this.postService.getPosts().pipe(
                    map((posts) => {
                        this.store.dispatch(
                            updatePostLoader({ isPostLoading: false })
                        );
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
                this.store.dispatch(updatePostLoader({ isPostLoading: true }));
                return this.postService.updatePost(action.post).pipe(
                    map((post) => {
                        this.store.dispatch(
                            updatePostLoader({ isPostLoading: false })
                        );
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
