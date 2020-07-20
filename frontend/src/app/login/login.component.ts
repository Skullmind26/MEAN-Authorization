import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public _route:Router
  ) {}

  loginOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    if(localStorage.getItem('isLoggedIn')){
      this._route.navigate(['/user']);
    }
    this.loginOnInit();
  }

  login() {
    let loginObj = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.userLoginCall(loginObj).subscribe((res) => {
      console.log(res);
      console.log(res["status"]);
      if (res["status"] == "success") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", res["data"].user._id);
        localStorage.setItem("username", res["data"].user.username);
        localStorage.setItem("token", res["data"].token);
        this._route.navigate(['/user']);
      }
    });
  }
}
