import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';

import 'rxjs/add/operator/map';

export class Friend {
    constructor(
        public fid: number,
        public fname: string,
        public fbirth: Date,
        public fnumber: string,
        public femail: string,
        public fgroup: string,
        public state: string,
        public photo: string,
        public uid:number
    ) { }
}

@Injectable()
export class BirthdayService {
    constructor(
        private userServ: UserService,
        private http: HttpClient) {

    }
    //获取全部朋友信息
    getFriends() {
        return this.http.get('http://localhost:3000/friends/friend-list',
            {
                observe: 'response',
                //在头部加上JWT验证信息
                //headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.userServ.getToken())
            });
    }
    //获取单个朋友信息
    getFriend(id: number | string) {
        return this.getFriends().map(res => {
            if (res.body['code'] === '200') {
                //console.log(res.body['results']);
                return res.body['results']
                    .find(result => result.fid === +id);
            }
        });
    }
    //修改朋友信息
    editFriend(friend: Friend){
        const body = {'value':friend,'operate':'edit'};
        return this.http.post('http://localhost:3000/friends/editfriend',body);
    }
    //新建朋友信息
    newFriend(friend: Friend){
        const body = {'value':friend,'operate':'new'};
        return this.http.post('http://localhost:3000/friends/editfriend', body);
    }
    //删除好友
    deleteFriend(friend:Friend){
        const body = {'value':friend, 'operate':'delete'};
        return this.http.post('http://localhost:3000/friends/editfriend',body);
    }
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