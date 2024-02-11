import {Component, OnDestroy} from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {InventoryService} from "../../model/utils/observables/inventory.service";
import {Subscription} from "rxjs";
import {ProductModel} from "../../model/entities/product.model";

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
  inventorySubscription: Subscription
  products: ProductModel[] | undefined
  constructor(private navService: NavService, private inventoryService: InventoryService, private router: Router) {
    this.navService.toggleNav(true)
    this.inventorySubscription = this.inventoryService.getProductsObservable$()
      .subscribe(products => { this.products = products })
  }

  searchProduct(search: any) {
    console.log(search['search_inventory'])
    console.log(search['filter_inventory'])
  }
  goToProducts(page: number) {
    this.router.navigate(['inventory/products/', page]).then().catch()
  }

  ngOnDestroy(): void {
    this.inventorySubscription.unsubscribe()
  }
}
