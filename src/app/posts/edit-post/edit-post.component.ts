import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { PostEntityService } from "src/app/Auth/services/post-entity.service";
import { Post } from "src/app/shared/component/header/interfaces/post.interface";
import { AppState } from "src/app/store/app.state";
import { updatePost } from "../state/post.actions";
import { getPostById } from "../state/post.selectors";

@Component({
    selector: "app-edit-post",
    templateUrl: "./edit-post.component.html",
    styleUrls: ["./edit-post.component.css"],
})
export class EditPostComponent implements OnDestroy {
    postSub: Subscription;
    postForm: FormGroup;
    post: Post;
    id: string;
    isEditingPost: boolean;
    constructor(
        private store: Store<AppState>,
        private router: Router,
        private route: ActivatedRoute,
        private postsEntityService: PostEntityService
    ) {}
    onUpdatePost() {
        const post: Post = {
            title: this.postForm.value.title,
            description: this.postForm.value.description,
            id: this.post.id,
        };
        // // without ngr/data
        // this.store.dispatch(updatePost({ post }));
        // this.router.navigate(["/post"]);

        //----------------using ngrx/data------------------
        this.isEditingPost = true;
        this.postsEntityService.update(post).subscribe({
            next: (data) => {
                this.isEditingPost = false;
            },
        });
    }

    createForm() {
        this.postForm = new FormGroup({
            title: new FormControl(null, [Validators.minLength(6)]),
            description: new FormControl(null, [
                Validators.required,
                Validators.minLength(10),
            ]),
        });
    }

    ngOnInit(): void {
        this.createForm();
        // // without ngrx/data
        // this.postSub = this.store.select(getPostById).subscribe((data) => {
        //     if (data) {
        //         this.post = data;
        //         this.postForm.patchValue({
        //             title: this.post.title,
        //             description: this.post.description,
        //         });
        //     }
        // });

        //----------------using ngrx/data------------------
        this.route.params.subscribe((data) => {
            this.id = data["id"];
            this.postsEntityService.entities$.subscribe((posts) => {
                this.post = posts.find((p) => p.id === this.id)!;
                this.postForm.patchValue({
                    title: this.post?.title,
                    description: this.post?.description,
                });
            });
        });
    }

    ngOnDestroy(): void {
        if (this.postSub) this.postSub.unsubscribe();
    }
}
