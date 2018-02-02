/**
 * 路由守卫
 * 保证未登录用户无法进入birthday页
 */
import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { UserService } from './user.service';
import { AuthTokenService } from './authtoken.service';



@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private tokenServe: AuthTokenService,
        private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url = state.url;
        if (this.tokenServe.getToken() !== null) {
            console.log('router success!');
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}