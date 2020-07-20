import { Injectable } from "@angular/core";
import { ApiUrls } from "./constant";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(public apiUrl: ApiUrls, public _http: HttpClient) {}

  userRegistrationCall(data): Observable<any> {
    let headers = new HttpHeaders({ "Content-type": "application/json" });
    return this._http.post(this.apiUrl.registerURL, data, { headers });
  }

  userLoginCall(data): Observable<any> {
    let headers = new HttpHeaders({ "Content-type": "application/json" });
    return this._http.post(this.apiUrl.loginURL, data, { headers });
  }

  userLogout(data): Observable<any> {
    let headers = new HttpHeaders({ "Content-type": "application/json", "Authorization":localStorage.getItem("token") });
    return this._http.post(this.apiUrl.logoutURL, data, { headers });
  }
}
