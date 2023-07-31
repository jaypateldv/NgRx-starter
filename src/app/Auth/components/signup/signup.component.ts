import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { setLoadingSpinner } from "src/app/store/shared/shared.action";
import { signUpStart } from "../../state/auth.actions";
import { AuthState } from "../../state/auth.state";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
    signUpForm: FormGroup;

    constructor(private store: Store<AuthState>) {}

    signup() {
        const userCreds = {
            email: this.signUpForm.value.email,
            password: this.signUpForm.value.password,
        };
        this.store.dispatch(setLoadingSpinner({ status: true }));
        this.store.dispatch(signUpStart(userCreds));
    }

    ngOnInit(): void {
        this.signUpForm = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", [
                Validators.required,
                Validators.minLength(7),
            ]),
        });
    }
}
