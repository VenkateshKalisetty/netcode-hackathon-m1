import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService,
  SignInGuardService,
} from './authentication/auth-guard.service';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ManageUsersComponent } from './user/manage-users/manage-users.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SignInComponent,
    canActivate: [SignInGuardService],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [SignInGuardService],
  },
  {
    path: 'users',
    component: ManageUsersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
