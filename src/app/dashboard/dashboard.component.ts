import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.utils";
import { AuthenticationService} from '../../model/api/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(
    private navService: NavService,
    private authService: AuthenticationService,
    private router: Router
    ) {
    this.navService.toggleNav(true);
  }

  logOut(): void{
    this.authService.signOutUser() 
  }
}
