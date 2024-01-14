import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }
}
