import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BirthdayService, Friend } from '../birthday.service';
import { JumbotronServive, Jumbotron } from '../../jumbotron.service';



@Component({
  selector: 'app-birthday-list',
  templateUrl: './birthday-list.component.html',
  styleUrls: ['./birthday-list.component.css']
})
export class BirthdayListComponent implements OnInit {
  friends: Friend[] = [];
  constructor(
    private birServ: BirthdayService,
  private jumbServ: JumbotronServive) {
    jumbServ.setJumbotron(new Jumbotron('Friends','',''));
   }

  ngOnInit() {
    this.refreshFriends();
  }
  //刷新列表
  refreshFriends(){
    this.friends = [];
    this.birServ.getFriends().subscribe(
      resp=>{
        if(resp.body['code'] === '200'){
          let list_length = resp.body['results'].length;
          let results = resp.body['results'];
          for(let i = 0; i < list_length; i++){
            let result = results[i];
            this.friends.push(new Friend(result['fid'],result['fname'],result['fbirth'],result['fpnumber'],
          result['femail'],result['fgroup'],result['state'],'http://localhost:3000'+result['photo'],result['uid']));
          }
        }
        console.log(this.friends);
      },
      (err)=>{
        this.birServ.handleError(err);
      },
      ()=>console.log('The Post observable is now completed.')
    )
  }

  //删除朋友
  delete(friend:Friend){
    // alert('delete friend');
    this.birServ.deleteFriend(friend).subscribe(
      resp=>{
        if(resp['code'] === '200'){
          console.log('删除信息成功！');
          this.refreshFriends();
        }
      },
      (err)=>{
        this.birServ.handleError(err);
      },
      ()=>console.log('The Post observable is now completed.')
    )
  }

}
