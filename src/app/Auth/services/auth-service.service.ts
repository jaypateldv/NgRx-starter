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
    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
            { email, password, returnSecureToke: true }
        );
    }

    formatUser(data: AuthResponseData) {
        const expirationDate = new Date(
            new Date().getTime() + +data.expiresIn * 1000
        );
        return new User(data.email, data.idToken, data.localId, expirationDate);
    }
}
