import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { CounterButtonComponent } from "./counter-button/counter-button.component";
import { CounterOutputComponent } from "./counter-output/counter-output.component";
import { CounterComponent } from "./counter/counter.component";
import { CustomCounterInputComponent } from "./custom-counter-input/custom-counter-input.component";
import { counterReducer } from "./state/counter.reducer";
import { COUNTER_STATE_NAME } from "./state/counter.selector";

const routes: Routes = [
    {
        path: "",
        component: CounterComponent,
        pathMatch: "full",
    },
];
@NgModule({
    declarations: [
        CounterOutputComponent,
        CounterButtonComponent,
        CounterComponent,
        CustomCounterInputComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer),
    ],
    exports: [],
})
export class CounterModule {}
