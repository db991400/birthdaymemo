import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';

import { UsersRoutingModule } from './users-routing.module';
import { HomeComponent } from './home/home.component';
import { RegistComponent } from './regist/regist.component';
import { PasswordEqualsDirective } from './password-equals.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    NgbModule
  ],
  declarations: [
    UsersComponent,
    LoginComponent,
    HomeComponent,
    RegistComponent,
  PasswordEqualsDirective]
})
export class UsersModule { }
