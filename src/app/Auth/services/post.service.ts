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
}
