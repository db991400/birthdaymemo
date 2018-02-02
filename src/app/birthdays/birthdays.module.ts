import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { BirthdayListComponent } from './birthday-list/birthday-list.component';
import { BirthdayRoutingModule } from './birthday-routing.module';
import { BirthdayService } from './birthday.service';
import { BirthdayDetailComponent } from './birthday-detail/birthday-detail.component';
import { AuthGuardService } from '../auth-guard.service';
import { AuthInterceptor } from '../auth-interceptor';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule,
    BirthdayRoutingModule,
    NgbModule
  ],
  providers:[
    BirthdayService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  declarations: [BirthdaysComponent, BirthdayListComponent, BirthdayDetailComponent]
})
export class BirthdaysModule { }
