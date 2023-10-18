import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostListComponent } from "./post-list/post-list.component";
import { postsReducer } from "./state/post.reducers";
import { PostEffects } from "./state/post.effects";
import { POST_STATE_NAME } from "./state/post.selectors";
import { SinglePostComponent } from "./single-post/single-post.component";
import { PostsResolver } from "./posts.resolver";
import { EntityDataService } from "@ngrx/data";
import { PostsDataService } from "./post-data.service";

const routes: Routes = [
    {
        path: "",
        component: PostListComponent,
        resolve: {
            posts$: PostsResolver,
        },
    },
    // children: [
    {
        path: "add",
        component: AddPostComponent,
        resolve: {
            posts$: PostsResolver,
        },
    },
    {
        path: "edit/:id",
        component: EditPostComponent,
        resolve: {
            posts$: PostsResolver,
        },
    },
    {
        path: "details/:id",
        component: SinglePostComponent,
        resolve: {
            posts$: PostsResolver,
        },
    },
    // ],
];
@NgModule({
    declarations: [
        EditPostComponent,
        AddPostComponent,
        PostListComponent,
        SinglePostComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(POST_STATE_NAME, postsReducer),
        EffectsModule.forFeature([PostEffects]),
    ],
    providers: [PostsResolver],
    exports: [],
})
export class PostsModule {
    constructor(
        entityDataService: EntityDataService,
        postDataService: PostsDataService
    ) {
        entityDataService.registerService("Post", postDataService);
    }
}
