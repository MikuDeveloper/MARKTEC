import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  showNav: boolean = true

  constructor(private router: Router, private navService: NavService) {
    this.navService.toggleNav(true);
  }

  goToRoute(route: string) {
    this.closeSidebar()
    this.router.navigate([route]).then().catch()
  }

  closeSidebar() {
    const close: HTMLButtonElement = document.getElementById('btn-close-sidebar')! as HTMLButtonElement
    close.click()
  }
}
