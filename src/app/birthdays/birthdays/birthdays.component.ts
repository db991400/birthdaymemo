import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JumbotronServive, Jumbotron } from '../../jumbotron.service';
import { AuthTokenService } from '../../authtoken.service';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css']
})
export class BirthdaysComponent implements OnInit {

  constructor(
    private jumbServ: JumbotronServive,
    private tokenServ: AuthTokenService,
    private router: Router) {
    jumbServ.setJumbotron(new Jumbotron('Friends', '', ''));
  }

  ngOnInit() {
  }

  logout() {
    this.tokenServ.setToken(null);
    this.router.navigate(['/']);
  }

}
