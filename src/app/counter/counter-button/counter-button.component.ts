import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-counter-button",
    templateUrl: "./counter-button.component.html",
    styleUrls: ["./counter-button.component.css"],
})
export class CounterButtonComponent {
    @Output() increment = new EventEmitter<void>();
    @Output() decrement = new EventEmitter<void>();
    @Output() reset = new EventEmitter<void>();
    onInc() {
        this.increment.emit();
    }
    onDec() {
        this.decrement.emit();
    }
    onReset() {
        this.reset.emit();
    }
}
