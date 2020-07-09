import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Define API
  apiBaseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

//   // Http Options
//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json'
//     })
//   }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBaseUrl}/user`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(`${this.apiBaseUrl}/user/${id}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createUser(user): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/user`, user)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  updateUser(user): Observable<User> {
    return this.http.put<User>(`${this.apiBaseUrl}/user`, user)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteUser(id){
    return this.http.delete<User>(`${this.apiBaseUrl}/user/${id}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
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