import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }
}
