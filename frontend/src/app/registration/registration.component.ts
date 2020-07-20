import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { AuthService } from "../auth.service";
import { MustMatch } from '../mustMatch';
import { Router } from '@angular/router';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public _route:Router
  ) {}

  registerationOnInit() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cpassword: new FormControl(null, Validators.required),
    }, {
      validator: MustMatch('password', 'cpassword'),
    });
  }

  ngOnInit() {
    if(localStorage.getItem('isLoggedIn')){
      this._route.navigate(['/user']);
    }
    this.registerationOnInit();
  }

  register() {
    let registerObj = {
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password,
    };
    this.authService.userRegistrationCall(registerObj).subscribe(res =>{ 
      console.log(res);
    });
  }
}
