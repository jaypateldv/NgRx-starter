import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PostsResolver } from "./posts/posts.resolver";
import { AuthGuard } from "./shared/component/guards/auth.guard";
import { SinglePostComponent } from "./single-post/single-post.component";

const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
        pathMatch: "full",
    },
    {
        path: "counter",
        canActivate: [AuthGuard],
        loadChildren: () =>
            import("./counter/counter.module").then((m) => m.CounterModule),
    },
    {
        path: "post",
        canActivate: [AuthGuard],
        resolve: {
            posts$: PostsResolver,
        },

        loadChildren: () =>
            import("./posts/posts.module").then((m) => m.PostsModule),
    },
    {
        path: "post/details/:id",
        canActivate: [AuthGuard],
        component: SinglePostComponent,
    },
    {
        path: "auth",
        loadChildren: () =>
            import("./Auth/auth.module").then((m) => m.AuthModule),
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
