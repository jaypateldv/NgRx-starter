import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { PostEntityService } from "src/app/Auth/services/post-entity.service";
import { Post } from "src/app/shared/component/header/interfaces/post.interface";
import { AppState } from "src/app/store/app.state";
import { addPost } from "../state/post.actions";

@Component({
    selector: "app-add-post",
    templateUrl: "./add-post.component.html",
    styleUrls: ["./add-post.component.css"],
})
export class AddPostComponent implements OnInit {
    postForm: FormGroup;
    isAddingPost: boolean;
    constructor(
        private store: Store<AppState>,
        private postsEntityService: PostEntityService,
        private router: Router
    ) {
        this.isAddingPost = false;
    }
    onAddNewPost() {
        const post: Post = {
            title: this.postForm.value.title,
            description: this.postForm.value.description,
        };
        // // without ngrx/data
        // this.store.dispatch(addPost({ post }));
        // this.postForm.reset();
        // ---------------------------Using ngrx/data-------------------------------------
        this.isAddingPost = true;
        this.postsEntityService.add(post).subscribe((data) => {
            this.postForm.reset();
            this.isAddingPost = false;
            this.router.navigate(["post"]);
        });
    }

    ngOnInit(): void {
        this.postForm = new FormGroup({
            title: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ]),
            description: new FormControl(null, [
                Validators.required,
                Validators.minLength(10),
            ]),
        });
    }
}
