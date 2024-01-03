import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.utils";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }
}
