import { Component } from '@angular/core';
import { NavService } from '../../../model/utils/navbar.util';
import { ReportsComponent } from "../reports.component";

@Component({
    selector: 'app-reports-boxcut',
    standalone: true,
    templateUrl: './reports-boxcut.component.html',
    styleUrl: './reports-boxcut.component.scss',
    imports: [ReportsComponent]
})
export class ReportsBoxcutComponent {
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }
}
