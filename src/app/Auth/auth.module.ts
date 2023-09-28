import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { SignupComponent } from "./components/signup/signup.component";
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./state/auth.effects";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "login",
                component: LoginComponent,
                pathMatch: "full",
            },
            {
                path: "signup",
                component: SignupComponent,
                pathMatch: "full",
            },
            {
                path: "**",
                redirectTo: "login",
            },
        ],
    },
];

@NgModule({
    declarations: [LoginComponent, SignupComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature(),
    ],
})
export class AuthModule {}
