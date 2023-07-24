import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { changeUserName, customIncrement } from "../state/counter.action";
import { CounterState } from "../state/counter.state";

@Component({
    selector: "app-custom-counter-input",
    templateUrl: "./custom-counter-input.component.html",
    styleUrls: ["./custom-counter-input.component.css"],
})
export class CustomCounterInputComponent implements OnInit {
    value: number;
    userName: string;
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
    onAdd() {
        this.store.dispatch(customIncrement({ value: this.value }));
    }
    onChangeUserName() {
        this.store.dispatch(changeUserName({ userName: this.userName }));
    }
}
