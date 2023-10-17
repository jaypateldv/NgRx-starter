import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Update } from "@ngrx/entity";
import { map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Post } from "../shared/component/header/interfaces/post.interface";

@Injectable({
    providedIn: "root",
})
export class PostsDataService extends DefaultDataService<Post> {
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super("Post", http, httpUrlGenerator);
    }

    override getAll(options?: HttpOptions | undefined): Observable<Post[]> {
        return this.http
            .get(`${environment.FIREBASE_REALTIME_DATABASE}/posts.json`)
            .pipe(
                map((data: any) => {
                    const posts: Post[] = [];
                    for (const key in data) {
                        if (data[key]) posts.push({ ...data[key], id: key });
                    }
                    return posts;
                })
            );
    }

    override add(
        entity: Post,
        options?: HttpOptions | undefined
    ): Observable<Post> {
        return this.http
            .post<{ name: string }>(
                `${environment.FIREBASE_REALTIME_DATABASE}/posts.json`,
                entity
            )
            .pipe(
                map((data) => {
                    return { ...entity, id: data.name };
                })
            );
    }

    override update(
        post: Update<Post>,
        options?: HttpOptions | undefined
    ): Observable<Post> {
        const postData = {
            [post.id!]: {
                title: post.changes.title,
                description: post.changes.description,
            },
        };
        return this.http
            .patch(
                "https://ngrx-v1-default-rtdb.firebaseio.com/posts.json",
                postData
            )
            .pipe(
                map((data: any) => {
                    let key = Object.keys(data)[0];
                    const post: Post = { ...data[key], id: key };
                    return post;
                })
            );
    }

    override delete(
        key: string | number,
        options?: HttpOptions | undefined
    ): Observable<string | number> {
        return this.http
            .delete(
                `${environment.FIREBASE_REALTIME_DATABASE}/posts/${key}.json`
            )
            .pipe(
                map((res) => {
                    return "deleted";
                })
            );
    }
}
