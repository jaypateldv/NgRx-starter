import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./shared/component/header/header.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpClientModule } from "@angular/common/http";
import { LoadingSpinnerComponent } from "./shared/component/loading-spinner/loading-spinner.component";
import { appReducer } from "./store/app.state";
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        LoadingSpinnerComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserModule,
        StoreModule.forRoot(appReducer),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forRoot({}),
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
