import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../../model/entities/product.model";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {InventoryService} from "../../../model/utils/observables/inventory.service";
import {StorageService} from "../../../model/api/storage.service";

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
  img1: string | undefined
  img2: string | undefined
  constructor(
    private inventoryService: InventoryService = InventoryService.getInstance(),
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.inventoryService.getProductsObservable$().subscribe(_ => {
      this.activatedRoute.paramMap.subscribe((params : ParamMap) => {
        let imei = params.get('imei')
        if (imei) {
          this.product = this.inventoryService.getProductByIMEI(imei)
          this.storageService.getUrlFromPath(this.product?.urlPhoto1!)
            .then((url) => { this.img1 = url })
          this.storageService.getUrlFromPath(this.product?.urlPhoto2!)
            .then((url) => { this.img2 = url })
        }
      })
    })
  }
}
