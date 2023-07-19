import { Component, EventEmitter, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { decrement, increment, reset } from "../state/counter.action";
@Component({
    selector: "app-counter-button",
    templateUrl: "./counter-button.component.html",
    styleUrls: ["./counter-button.component.css"],
})
export class CounterButtonComponent {
    constructor(private store: Store<{ counter: { counter: number } }>) {}
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
