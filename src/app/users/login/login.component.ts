import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Jumbotron, JumbotronServive } from '../../jumbotron.service';
import { User } from '../../user';
import { NgModel } from '@angular/forms';
import { UserService } from '../../user.service';
import { AuthTokenService } from '../../authtoken.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User(0, '', '', '');
  imgSrc = "/assets/images/eye-off.png";
  passtype = 'password';
  notPass = false;
  constructor(
    private route: Router,
    private jumService: JumbotronServive,
    private userServ: UserService,
  private tokenServ: AuthTokenService) {
    jumService.setJumbotron(new Jumbotron('Login',
      `Please login with your user name and password first`,
      ``));
  }
  onSubmit() {
    this.userServ.getUser(this.user).subscribe(
      (resp) => {
        //this.userServ.setToken(resp.body['token']);
        this.tokenServ.setToken(resp.body['token']);
        this.route.navigate(['/birthday']);
        console.log(resp.body);
        alert('登录成功！');
      },
      (err)=>
      alert(this.userServ.handleError(err)),
      () => console.log('The Post observable is now completed. ')
    )
  }

  toggleText(){
    /* this.imgSrc = (this.imgSrc === '/assets/images/eye_open.png'? 
    '/assets/images/eye-off.png' : '/assets/images/eye_open.png'); */
    if(!this.notPass){
      this.imgSrc = '/assets/images/eye-off.png';
      this.passtype = 'password';
      this.notPass = true;
    }else{
      this.imgSrc = '/assets/images/eye_open.png';
      this.passtype = 'text';
      this.notPass = false;
    }
  }
}
