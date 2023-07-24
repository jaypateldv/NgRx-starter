import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Post } from "src/app/shared/component/header/interfaces/post.interface";
import { AppState } from "src/app/store/app.state";
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
    }

    onAddNewPost(post: NgForm) {
        console.log("post", post.value);
    }
}
