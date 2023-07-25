import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./shared/component/header/header.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { appReducer } from "./store/app.state";
@NgModule({
    declarations: [AppComponent, HomeComponent, HeaderComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserModule,
        StoreModule.forRoot(appReducer),
        StoreDevtoolsModule.instrument({}),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
