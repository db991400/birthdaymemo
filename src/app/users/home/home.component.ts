import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { JumbotronServive, Jumbotron  } from '../../jumbotron.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  constructor(private jumService: JumbotronServive) {
    this.jumService.setJumbotron(new Jumbotron('birthday',
    `To help you remember every friend's birthday, we are also your friends!`,
  `Busy city, hard work you.Friends spend less time together. Did you remember your friend's birthday party?Can you remember
  your friends' birthdays? Come on!At least give them a sincere blessing!Let's help you!`));
   }
  ngOnInit(){
   
  }
  @ViewChild('login') public loginPopvoer: NgbPopover;
  @ViewChild('regist') public registPopover: NgbPopover;
  showPopver(event:any){
    if(event.target.name === 'login'){
      this.loginPopvoer.open();
    }
    if(event.target.name === 'regist'){
      this.registPopover.open();
    }
    
  }
  closePopover(event:any){
    if(event.target.name === 'login'){
      this.loginPopvoer.close();
    }
    if(event.target.name === 'regist'){
      this.registPopover.close();
    }
  }
}
