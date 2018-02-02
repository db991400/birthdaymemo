import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {
    // private token: string;
    constructor(
        private http: HttpClient) { }
    //注册用户
    saveUser(user: User) {
        const savedUser = {
            name: user.name,
            password: user.password,
            email: user.email
        }
        return this.http.post('http://localhost:3000/users/register', savedUser, {
            responseType: "json"
        });

    }
    //登录
    getUser(user: User) {
        const loginUser = {
            name: user.name,
            password: user.password
        };
        return this.http.post('http://localhost:3000/users/login', loginUser, {
            observe: 'response' //获取所有返回信息
        });

    }
    //设置token
    /* setToken(token: string) {
        this.token = token;
        //console.log(this.token);
    } */
    //获取token
    /* getToken():string{
        console.log(this.token);
        return this.token;
    } */
    //错误处理
    handleError(err: HttpErrorResponse): string {
        if (err.error instanceof Error) {
            return '发生错误，错误信息:' + err.error.message;
        } else {
            console.log(`Backend returned code ${err.status}, body was: ${err.error['msg']}`);
            return err.error['msg'];
        }
    }
}