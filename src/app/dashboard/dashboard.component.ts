import { Component } from '@angular/core';
import { NavService } from '../../model/utils/navbar.utils';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }
}
