import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { PostService } from "src/app/Auth/services/post.service";
import {
    addPost,
    addPostSuccess,
    loadPosts,
    loadPostsSuccess,
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
}
