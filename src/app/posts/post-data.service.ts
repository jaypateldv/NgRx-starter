import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { map, Observable } from "rxjs";
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
        return this.http.get(`${environment.FIREBASE_REALTIME_DATABASE}/posts.json`).pipe(
            map((data: any) => {
                const posts: Post[] = [];
                for (const key in data) {
                    if (data[key]) posts.push({ ...data[key], id: key });
                }
                return posts;
            })
        );
    }

    geaa(){
        
    }
}
