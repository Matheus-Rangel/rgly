import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RedirectComponent} from "./redirect/redirect.component";
import {NotFoundComponent} from "./404/not-found.component";
import {ManagementComponent} from "./management/management.component";


const routes: Routes = [
  {path: '', redirectTo: '/authenticate', pathMatch: 'full'},
  {path: 'authenticate', component: LoginComponent},
  {path: 'management', component: ManagementComponent},
  {path: '404', component: NotFoundComponent},
  {path: ':link', component: RedirectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
