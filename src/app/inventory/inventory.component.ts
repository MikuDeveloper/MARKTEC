import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }

  searchProduct(search: any) {
    console.log(search['search_inventory'])
    console.log(search['filter_inventory'])
  }
}
