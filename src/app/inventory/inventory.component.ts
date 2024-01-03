import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.utils";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }
}
