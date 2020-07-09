import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EnsureAuthenticatedService } from './ensure-authenticated.service';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    redirectTo: 'user' 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'user', 
    component: UserListComponent,
    canActivate: [ EnsureAuthenticatedService ]
  },
  { 
    path: 'user/new', 
    component: UserCreateComponent,
    canActivate: [ EnsureAuthenticatedService ]
  },
  { 
    path: 'user/:id', 
    component: UserEditComponent,
    canActivate: [ EnsureAuthenticatedService ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
