import { Component, EventEmitter, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { decrement, increment, reset } from "../state/counter.action";
import { CounterState } from "../state/counter.state";
@Component({
    selector: "app-counter-button",
    templateUrl: "./counter-button.component.html",
    styleUrls: ["./counter-button.component.css"],
})
export class CounterButtonComponent {
    constructor(private store: Store<AppState>) {}
    onInc() {
        this.store.dispatch(increment());
    }
    onDec() {
        this.store.dispatch(decrement());
    }
    onReset() {
        this.store.dispatch(reset());
    }
}
