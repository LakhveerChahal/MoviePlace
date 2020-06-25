import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8ZMWtzxmH1xJj4xb7VULqZ0DGmAzG_j4',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    )
    .pipe(catchError(this.handleError));
  }

  isLoggedIn(){
    return false;
  }
  
  signUp(email: string, password: string){
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8ZMWtzxmH1xJj4xb7VULqZ0DGmAzG_j4', 
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
