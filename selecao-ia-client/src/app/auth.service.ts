import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { User } from "./user-common/user.model";
import { retry, catchError, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    readonly apiBaseUrl = "http://localhost:8080";

    public user = new BehaviorSubject<User>(undefined);
    public isAuthenticated = new BehaviorSubject<boolean>(false);

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {}

    async checkAuthenticated() {
       
       let authenticated = false; 
       try {

          const user = await this.httpClient.get<User>(`${this.apiBaseUrl}/me`).toPromise();

          console.log(user);

          this.user.next(user);
          this.isAuthenticated.next(true);

          authenticated = true;

       } catch(err) {
        this.user.next(undefined);
        this.isAuthenticated.next(false);
       }
       
       return authenticated;
    }

    login(login: string, password: string) {
        return this.httpClient.post<User>(`${this.apiBaseUrl}/auth/login`, {login, password})
        .pipe(
            retry(1),
            tap((user: User) => {
                this.user.next(user);
                this.isAuthenticated.next(true);
                this.router.navigate(['user']);
            }),
            catchError(this.handleError)
        );
    }

    logout(redirect: string) {
        this.httpClient.post(`${this.apiBaseUrl}/quit`, null).subscribe(_ => {
            this.router.navigate([redirect]);
        });
    }

    handleError(error) {

    let message = '';
    if(error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else {
      message = error?.error?.message || '';
    }

    return throwError({
      message
    });
  }
}