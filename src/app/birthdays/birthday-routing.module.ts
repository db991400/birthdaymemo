import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { BirthdayListComponent } from './birthday-list/birthday-list.component';
import { AuthGuardService } from '../auth-guard.service';
import { BirthdayDetailComponent } from './birthday-detail/birthday-detail.component';

const birthRoutes: Routes = [
    {
        path: 'birthday',
        component: BirthdaysComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: '', component: BirthdayListComponent },
            {
                path: ':id',
                component: BirthdayDetailComponent
            },
            {
                path:'new',
                component:BirthdayDetailComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(birthRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BirthdayRoutingModule {

}