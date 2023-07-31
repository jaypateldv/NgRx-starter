import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { AppState } from "./store/app.state";
import { getErrorMessage, getLoading } from "./store/shared/shared.selector";
import { MessageStatus } from "./store/shared/shared.state";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    title = "ngrx-counter";
    showLoading: Observable<boolean>;
    errorMessage: Observable<string>;
    constructor(
        private store: Store<AppState>,
        private toastrService: ToastrService
    ) {}
    ngOnInit(): void {
        this.showLoading = this.store.select(getLoading);
        this.store.select(getErrorMessage).subscribe((data) => {
            if (data.message) {
                if (data.status == MessageStatus.ERROR)
                    this.toastrService.error(data.message);
                else this.toastrService.success(data.message);
            }
        });
    }
}
