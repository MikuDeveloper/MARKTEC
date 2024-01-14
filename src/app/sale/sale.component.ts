import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }
}
