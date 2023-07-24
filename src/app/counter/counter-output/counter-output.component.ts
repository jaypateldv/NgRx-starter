import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getCounter, getUserName } from "../state/counter.selector";
import { CounterState } from "../state/counter.state";
@Component({
    selector: "app-counter-output",
    templateUrl: "./counter-output.component.html",
    styleUrls: ["./counter-output.component.css"],
})
export class CounterOutputComponent implements OnInit {
    counter$: Observable<number>;
    userName$: Observable<string>;
    constructor(private store: Store<{ counter: CounterState }>) {}

    ngOnInit(): void {
        this.counter$ = this.store.select(getCounter);
        this.userName$ = this.store.select(getUserName);
    }
}
