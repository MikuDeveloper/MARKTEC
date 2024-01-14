import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";

@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})
export class DebtsComponent {
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }
}
