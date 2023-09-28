import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthResponseData } from "src/app/shared/component/header/interfaces/authResponse.interface";
import { User } from "src/app/shared/component/header/interfaces/user.interface";
import { AppState } from "src/app/store/app.state";
import { environment } from "src/environments/environment";
import { autoLogout } from "../state/auth.actions";

@Injectable({
    providedIn: "root",
})
export class AuthServiceService {
    timeoutInterval: any;
    constructor(private http: HttpClient, private store: Store<AppState>) {}

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
            { email, password, returnSecureToke: true }
        );
    }
    signup(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
            { email, password, returnSecureToke: true }
        );
    }
    logout() {
        localStorage.removeItem("userData");
        if (this.timeoutInterval) {
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval = null;
        }
    }
    formatUser(data: AuthResponseData) {
        const expirationDate = new Date(
            new Date().getTime() + +data.expiresIn * 1000
        );
        return new User(data.email, data.idToken, data.localId, expirationDate);
    }

    setUserInDB(user: User) {
        localStorage.setItem("userData", JSON.stringify(user));
        this.runTimeOutInterval(user);
    }

    runTimeOutInterval(user: User) {
        const todaysDate = new Date().getTime();
        const expirationDate = user.expireDate.getTime();
        const timeInterval = expirationDate - todaysDate;
        this.timeoutInterval = setTimeout(() => {
            this.store.dispatch(autoLogout());
        }, timeInterval);
    }

    getUserFromDB() {
        const userString = localStorage.getItem("userData");
        if (userString) {
            const userData = JSON.parse(userString);
            const expirationDate = new Date(userData.expirationDate);
            const user = new User(
                userData.email,
                userData.token,
                userData.localId,
                expirationDate
            );
            this.runTimeOutInterval(user);
            return user;
        } else return null;
    }

    getErrorMessage(message: string) {
        switch (message) {
            case "EMAIL_NOT_FOUND":
                return "Email Not Found";
            case "INVALID_PASSWORD":
                return "Entered password is invalid";
            default:
                return "Something went wrong !!. Please try again";
        }
    }
}
