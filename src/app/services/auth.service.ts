import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  regUser = [{
    email: 'name@name.com', password: '12345678'
  }];
  constructor() { }

  login(user: { email: string, password: string }): boolean {
    return this.regUser.includes(user);
  }
}
