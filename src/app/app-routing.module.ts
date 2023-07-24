import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CounterComponent } from "./counter/counter/counter.component";
import { HomeComponent } from "./home/home.component";
import { AddPostComponent } from "./posts/add-post/add-post.component";
import { PostListComponent } from "./posts/post-list/post-list.component";

const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
        pathMatch: "full",
    },
    {
        path: "counter",
        component: CounterComponent,
        pathMatch: "full",
    },
    {
        path: "post",
        component: PostListComponent,
        children: [
            {
                path: "add",
                component: AddPostComponent,
            },
        ],
    },
    {
        path: "**",
        redirectTo: "home",
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
