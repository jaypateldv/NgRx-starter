import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { PostEntityService } from "../../Auth/services/post-entity.service";
import { getPostById } from "../state/post.selectors";
import { Post } from "../../shared/component/header/interfaces/post.interface";
import { AppState } from "../../store/app.state";

@Component({
    selector: "app-single-post",
    templateUrl: "./single-post.component.html",
    styleUrls: ["./single-post.component.css"],
})
export class SinglePostComponent implements OnInit {
    // post: Observable<Post>;
    post: Post;
    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private postsEntityService: PostEntityService
    ) {}

    ngOnInit(): void {
        // // without using ngrx/data
        // this.post = this.store.select(getPostById) as Observable<Post>;
        //using ngrx/data
        this.route.params.subscribe((data) => {
            this.postsEntityService.entities$.subscribe((posts) => {
                this.post = posts.find((p) => p.id === data["id"])!;
                // this.postForm.patchValue({
                //     title: this.post?.title,
                //     description: this.post?.description,
                // });
            });
        });
    }
}
