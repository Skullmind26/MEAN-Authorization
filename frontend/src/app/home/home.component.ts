import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  username: string;

  constructor(public _route:Router, public authService: AuthService) {}

  ngOnInit() {
    this.username = localStorage.getItem("username");
  }

  logout() {
    let logoutObj = {
      user_id: localStorage.getItem('userId')
    };
    this.authService.userLogout(logoutObj).subscribe((res) => {
      console.log(res);
      if (res["status"] == "success") {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        this._route.navigate(['/login']);
      }
    });
  }
}
