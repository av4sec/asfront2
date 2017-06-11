import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';


import 'rxjs/add/operator/toPromise';
import {UserDetail} from "./user-detail";
import {AuthenticationResult} from "./authentication-result";
import {JwtHelper} from "angular2-jwt/angular2-jwt";

@Injectable()
export class AuthService {

  urlRequested: string;

  constructor(private http: Http, private jwtHelper: JwtHelper) {
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("token") && !this.jwtHelper.isTokenExpired(localStorage.getItem("token"));
  }

  authenticate(userDetail: UserDetail): PromiseLike<AuthenticationResult> {
    return this.http.post('/api/user', userDetail)
      .toPromise().then(resp => {
        if (resp.status == 200) {
          localStorage.setItem("token", resp.json().token);
          return new AuthenticationResult(true, this.urlRequested, resp);
        }
      }).catch(error => {
        return new AuthenticationResult(false, this.urlRequested, error);
      })
  }
}
