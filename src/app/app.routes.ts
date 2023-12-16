import { Routes } from '@angular/router';
import { LoginComponent } from './signin/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/guards/auth.guard';

export const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
];
