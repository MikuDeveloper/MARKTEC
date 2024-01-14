import { Component } from '@angular/core';
import { NavService } from '../../model/utils/navbar.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private navService: NavService, private router : Router) {
    this.navService.toggleNav(true);
  }

  goToRoute(route : string){
    this.router.navigate([route]).then().catch()
  }
}
