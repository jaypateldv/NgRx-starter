import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
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
    constructor(private store: Store<AppState>, private router: Router) {}
    onUpdatePost() {
        const post: Post = {
            title: this.postForm.value.title,
            description: this.postForm.value.description,
            id: this.post.id,
        };
        this.store.dispatch(updatePost({ post }));
        this.router.navigate(["/post"]);
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
        this.postSub = this.store.select(getPostById).subscribe((data) => {
            if (data) {
                this.post = data;
                this.postForm.patchValue({
                    title: this.post.title,
                    description: this.post.description,
                });
            }
        });
    }

    ngOnDestroy(): void {
        if (this.postSub) this.postSub.unsubscribe();
    }
}
