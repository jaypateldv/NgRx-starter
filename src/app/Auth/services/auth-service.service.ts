import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthResponseData } from "src/app/shared/component/header/interfaces/authResponse.interface";
import { User } from "src/app/shared/component/header/interfaces/user.interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthServiceService {
    timeoutInterval: any;
    constructor(private http: HttpClient) {}

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

    formatUser(data: AuthResponseData) {
        const expirationDate = new Date(
            new Date().getTime() + +data.expiresIn * 1000
        );
        return new User(data.email, data.idToken, data.localId, expirationDate);
    }

    setUserInDB(user: User) {
        localStorage.setItem("userData", JSON.stringify(user));

        const todaysDate = new Date().getTime();
        const expirationDate = user.expireDate.getTime();
        const timeInterval = expirationDate - todaysDate;

        this.timeoutInterval = setTimeout(() => {
            //logout or get refresh token
        }, timeInterval);
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
