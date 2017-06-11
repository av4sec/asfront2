import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import {AuthService} from "..//auth-service.service";
import {UserDetail} from "../user-detail";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userDetail: UserDetail = new UserDetail();
  submitted: boolean;
  failedOn403: boolean;

  constructor(private router: Router, private http: Http,
              private authService: AuthService, private authHttp: AuthHttp) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.authenticate(this.userDetail).then(resp => {
        this.submitted = true;
        if (resp.result) {
          let navigateTo = resp.urlRequested ? resp.urlRequested : '';
          this.router.navigate([navigateTo]);
        } else {
          this.failedOn403 = true;
        }
      }
    );
  }
}
