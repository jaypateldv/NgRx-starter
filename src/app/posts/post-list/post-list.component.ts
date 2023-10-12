import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Post } from "src/app/shared/component/header/interfaces/post.interface";
import { AppState } from "src/app/store/app.state";
import { deletePost, loadPosts } from "../state/post.actions";
import { getPosts } from "../state/post.selectors";

@Component({
    selector: "app-post-list",
    templateUrl: "./post-list.component.html",
    styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit {
    posts$: Observable<Post[]>;
    isAddingPost: boolean = false;
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.posts$ = this.store.select(getPosts);
        this.store.dispatch(loadPosts());
    }

    onDeletePost(post: Post) {
        if (confirm("Are you sure you want to delete")) {
            this.store.dispatch(deletePost({ post }));
        }
    }
}
