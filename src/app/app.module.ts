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
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingSpinnerComponent } from "./shared/component/loading-spinner/loading-spinner.component";
import { appReducer } from "./store/app.state";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthEffects } from "./Auth/state/auth.effects";
import { AuthInterceptor } from "./Auth/services/auth.interceptor";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { CustomSerializer } from "./store/router/custom-serializer";
import { SinglePostComponent } from './single-post/single-post.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        LoadingSpinnerComponent,
        SinglePostComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        EffectsModule.forRoot([AuthEffects]),
        StoreModule.forRoot(appReducer),
        StoreDevtoolsModule.instrument({}),
        HttpClientModule,
        ToastrModule.forRoot(),
        StoreRouterConnectingModule.forRoot({
            serializer: CustomSerializer,
        }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
