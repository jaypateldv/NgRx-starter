import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Post } from "src/app/shared/component/header/interfaces/post.interface";

@Injectable({
    providedIn: "root",
})
export class PostService {
    constructor(private http: HttpClient) {}

    getPosts(): Observable<Post[]> {
        return this.http
            .get("https://ngrx-v1-default-rtdb.firebaseio.com/posts.json")
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

    addPost(post: Post): Observable<{ name: string }> {
        return this.http.post<{ name: string }>(
            "https://ngrx-v1-default-rtdb.firebaseio.com/posts.json",
            post
        );
    }
    updatePost(post: Post): Observable<Post> {
        const postData = {
            [post.id!]: { title: post.title, description: post.description },
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

    deletePost(id: string) {
        return this.http.delete(
            `https://ngrx-v1-default-rtdb.firebaseio.com/posts/${id}.json`
        );
    }
}
