import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
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
    constructor(private store: Store<AppState>) {}
    onAddNewPost() {
        console.log("post", this.postForm.value);
        const post: Post = {
            title: this.postForm.value.title,
            description: this.postForm.value.description,
        };
        this.store.dispatch(addPost({ post }));
        this.postForm.reset();
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
