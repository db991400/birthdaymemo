//认证请求拦截器，转到birthday-list页面时，都要先发送认证信息
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { AuthTokenService } from './authtoken.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(
        private tokenServ: AuthTokenService
    ){}
    intercept(req: HttpRequest<any>,next: HttpHandler) : Observable<HttpEvent<any>>{
        //获取认证信息
         const auth = this.tokenServ.getToken();
        //const auth = '1231321323';
        console.log('auth: ' + auth);
        //克隆request,加入新的头信息
        const authReq = req.clone({headers:req.headers.set('Authorization', 'Bearer ' + auth)});
        return next.handle(authReq);
    }
}