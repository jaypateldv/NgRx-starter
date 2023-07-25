import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { CounterOutputComponent } from "./counter/counter-output/counter-output.component";
import { CounterButtonComponent } from "./counter/counter-button/counter-button.component";
import { CounterComponent } from "./counter/counter/counter.component";
import { StoreModule } from "@ngrx/store";
import { CustomCounterInputComponent } from "./counter/custom-counter-input/custom-counter-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./shared/component/header/header.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { appReducer } from "./store/app.state";
import { AddPostComponent } from "./posts/add-post/add-post.component";
import { EditPostComponent } from './posts/edit-post/edit-post.component';
@NgModule({
    declarations: [
        AppComponent,
        CounterOutputComponent,
        CounterButtonComponent,
        CounterComponent,
        CustomCounterInputComponent,
        HomeComponent,
        HeaderComponent,
        PostListComponent,
        AddPostComponent,
        EditPostComponent,
    ],
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
