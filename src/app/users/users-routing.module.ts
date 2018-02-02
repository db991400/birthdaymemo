import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { RegistComponent } from './regist/regist.component';

const usersRoutes: Routes = [
    {
        path:'',
        component:UsersComponent,
        children:[
            {path:'', component:HomeComponent},
            {path: 'login', component: LoginComponent},
            {path:'regist',component:RegistComponent}
        ]
    },
    
];

@NgModule({
    imports:[
        RouterModule.forChild(usersRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class UsersRoutingModule{}