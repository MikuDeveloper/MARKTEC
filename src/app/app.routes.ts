import { Routes } from '@angular/router';
import { LoginComponent } from './signin/login/login.component';
import { HomeComponent } from './home/home.component';
import { loginGuard } from '../shared/guards/login.guard';

export const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
];
