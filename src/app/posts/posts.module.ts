import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostListComponent } from "./post-list/post-list.component";
import { postsReducer } from "./state/post.reducers";
import { POST_STATE_NAME } from "./state/post.selectors";

const routes: Routes = [
    {
        path: "",
        component: PostListComponent,
        children: [
            {
                path: "add",
                component: AddPostComponent,
            },
            {
                path: "edit/:id",
                component: EditPostComponent,
            },
        ],
    },
];
@NgModule({
    declarations: [EditPostComponent, AddPostComponent, PostListComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    ],
    exports: [],
})
export class PostsModule {}
