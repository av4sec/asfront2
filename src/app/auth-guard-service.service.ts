import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth-service.service";

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isAuthenticated()) {
      this.authService.urlRequested = state.url;
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
