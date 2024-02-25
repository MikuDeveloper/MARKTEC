import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }


}
