import {Component, OnDestroy} from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {InventoryService} from "../../model/utils/observables/inventory.service";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent implements OnDestroy {
  constructor(private navService: NavService) {
    this.navService.toggleNav(true)
  }

  searchProduct(search: any) {
    console.log(search['search_inventory'])
    console.log(search['filter_inventory'])
  }

  ngOnDestroy(): void {

  }
}
