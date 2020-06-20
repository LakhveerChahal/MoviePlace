import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  regUser = [{
    email: 'name@name.com', password: '12345678'
  }];

  constructor(private http: HttpClient) { }

  login(user: { email: string, password: string }): boolean {
    return this.regUser.includes(user);
  }

  isLoggedIn(){
    return false;
  }

  signUp(email: string, password: string){
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyC8ZMWtzxmH1xJj4xb7VULqZ0DGmAzG_j4', 
    {
      email: email,
      password: password
    });
  }
}
