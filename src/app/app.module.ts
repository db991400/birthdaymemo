import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { UsersModule } from './users/users.module';
import { AppRoutingModule } from './app-routing.module';
import { JumbotronServive } from './jumbotron.service';
import { UserService } from './user.service';
import { AuthTokenService } from './authtoken.service';
import { BirthdaysModule } from './birthdays/birthdays.module';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    UsersModule,
    BirthdaysModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    JumbotronServive,
    UserService,
    AuthTokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
