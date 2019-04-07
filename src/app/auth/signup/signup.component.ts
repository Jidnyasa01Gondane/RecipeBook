import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authsService: AuthService){

  }

  ngOnInit() {
  }
  
  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authsService.signupUser(email,password);
    console.log(email);
    console.log(password)
  }
}
