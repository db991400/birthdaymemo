import { Injectable } from '@angular/core';

@Injectable()
export class AuthTokenService{
    setToken(token:string){
        sessionStorage.removeItem('token');
        if((token as string).length != 0){
            sessionStorage.token = token;
            console.log('sessionStorage.token: ' + sessionStorage.token);
        }
        
    }
    getToken(){
        if(sessionStorage.token){
            return sessionStorage.token;
        }else{
            return null;
        }
    }
}