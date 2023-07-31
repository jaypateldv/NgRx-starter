import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { isAuthenticated } from "src/app/Auth/state/auth.selectors";
import { AuthState } from "src/app/Auth/state/auth.state";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
    isAuthenticated: Observable<boolean>;
    constructor(private store: Store<AuthState>) {}
    ngOnInit(): void {
        this.isAuthenticated = this.store.select(isAuthenticated);
    }
}
