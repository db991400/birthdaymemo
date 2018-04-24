import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


export class Jumbotron{
    constructor(
        public title:string,
        public lead:string,
        public content:string
    ){}
}
@Injectable()
export class JumbotronServive{
    private jumbSource = new Subject<Jumbotron>();

    //获取subject发来的消息
    jumb$ = this.jumbSource.asObservable();

    setJumbotron(jumb: Jumbotron){
        this.jumbSource.next(jumb);
    }
    
}