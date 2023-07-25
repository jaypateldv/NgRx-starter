import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "login",
                component: LoginComponent,
            },
            {
                path: "**",
                redirectTo: "login",
            },
        ],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
