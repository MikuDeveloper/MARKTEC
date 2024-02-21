import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../../model/entities/product.model";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {InventoryService} from "../../../model/utils/observables/inventory.service";

@Component({
  selector: 'app-inventory-details',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './inventory-details.component.html',
  styleUrl: './inventory-details.component.scss'
})
export class InventoryDetailsComponent implements OnInit{
  product: ProductModel | undefined
  constructor(
    private inventoryService: InventoryService = InventoryService.getInstance(),
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.inventoryService.getProductsObservable$().subscribe(_ => {
      this.activatedRoute.paramMap.subscribe((params : ParamMap) => {
        let imei = params.get('imei')
        if (imei) this.product = this.inventoryService.getProductByIMEI(imei)
      })
    })
  }
}
