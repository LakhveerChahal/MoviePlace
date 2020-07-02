import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';

import { User } from '../Models/user.model';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8ZMWtzxmH1xJj4xb7VULqZ0DGmAzG_j4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthData(resData.email, resData.idToken, +resData.expiresIn, resData.localId);
        })
      );
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8ZMWtzxmH1xJj4xb7VULqZ0DGmAzG_j4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthData(resData.email, resData.idToken, +resData.expiresIn, resData.localId);
        })
      );
  }

  isLoggedIn() {
    return false;
  }

  private handleAuthData(email: string, token: string, expiresIn: number, userId: string) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }


  private handleError(err: HttpErrorResponse) {
    if (err && err.error) {
      let errmsg;
      switch (err.error.error.message) {
        case "EMAIL_EXISTS":
          errmsg = "Oops! Email already exists!";
          break;
        case "EMAIL_NOT_FOUND":
          errmsg = "Invalid username or password";
          break;
        case "EMAIL_NOT_FOUND":
          errmsg = "Invalid username or password";
          break;
        default:
          errmsg = "An unknown error occured. Please try again later.";
      }
      return throwError(errmsg);
    }
    else {
      return throwError("An unknown error occured.");
    }
  }
}
