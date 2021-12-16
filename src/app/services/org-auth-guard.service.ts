import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, Roles } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrgAuthGuardService implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.authService.role !== Roles.ORGANIZATION) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
