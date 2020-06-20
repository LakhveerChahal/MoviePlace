import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  onLogin(loginForm: NgForm){
    console.log(loginForm);
    const user = {
      email: loginForm.value.email,
      password: loginForm.value.password
    };
    console.log(this.authService.login(user));
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode){

    }
    else{
      this.authService.signUp(email, password).subscribe((res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });
    }
  }

}
