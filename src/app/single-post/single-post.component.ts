import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getPostById } from "../posts/state/post.selectors";
import { Post } from "../shared/component/header/interfaces/post.interface";
import { AppState } from "../store/app.state";

@Component({
    selector: "app-single-post",
    templateUrl: "./single-post.component.html",
    styleUrls: ["./single-post.component.css"],
})
export class SinglePostComponent implements OnInit {
    post: Observable<Post>;
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.post = this.store.select(getPostById) as Observable<Post>;
    }
}
