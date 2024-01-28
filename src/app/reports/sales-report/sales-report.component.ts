import { Component } from '@angular/core';
import { NavService } from '../../../model/utils/navbar.util';
import { ReportsComponent } from '../reports.component';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [ReportsComponent],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss'
})
export class SalesReportComponent {
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }  
}
