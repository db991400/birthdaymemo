import { Component, ViewChild, OnInit } from '@angular/core';
import { Jumbotron, JumbotronServive } from './jumbotron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title:string;
  lead:string;
  content:string;
  constructor(private jumServ: JumbotronServive){
    jumServ.jumb$.subscribe(
      jumb=>{
        this.title = jumb.title;
        this.lead = jumb.lead;
        this.content = jumb.content;
      }
    )
  }
  ngOnInit(){
   
  }
}
