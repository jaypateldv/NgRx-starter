import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { CounterOutputComponent } from "./counter/counter-output/counter-output.component";
import { CounterButtonComponent } from "./counter/counter-button/counter-button.component";
import { CounterComponent } from "./counter/counter/counter.component";

@NgModule({
    declarations: [
        AppComponent,
        CounterOutputComponent,
        CounterButtonComponent,
        CounterComponent,
    ],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
