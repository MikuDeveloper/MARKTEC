import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ProductModel} from "../../../model/entities/product.model";
import {InventoryService} from "../../../model/utils/observables/inventory.service";
import {ActivatedRoute, ParamMap, Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-inventory-products',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './inventory-products.component.html',
  styleUrl: './inventory-products.component.scss'
})
export class InventoryProductsComponent implements OnDestroy {
  inventorySubscription: Subscription | undefined
  products: ProductModel[] | undefined
  pageSize: number = 9
  pages: number[] | undefined
  activePage: number = 1
  constructor(
    private inventoryService: InventoryService = InventoryService.getInstance(),
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.activePage = parseInt(params.get('page') || '1')
      this.inventorySubscription = this.inventoryService.getProductsObservable$()
        .subscribe(_ => {
          this.products = this.inventoryService.getProducts(this.pageSize, this.activePage!)
          this.pages = Array.from({length: this.inventoryService.getTotalPages(this.pageSize)}, (_, i) => i + 1)
        })
    })
    this.hiddenItems()
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.inventorySubscription.unsubscribe()
  }
  previousPage() {
    if (this.activePage != 1) {
      this.router.navigateByUrl(`inventory/products/${this.activePage-1}`, ).then().catch()
    }
  }

  nextPage() {
    if (this.activePage != this.pages?.length) {
      this.router.navigateByUrl(`inventory/products/${this.activePage+1}`, ).then().catch()
    }
  }

  hiddenItems () {
    let infoInventory = <HTMLDivElement> document.querySelector('#infoInventory')
    infoInventory.classList.remove('visually-hidden')
    infoInventory.classList.add('visually-hidden')
  }
}
