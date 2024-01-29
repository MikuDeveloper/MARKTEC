import { Component } from '@angular/core';
import {FormsModule, NgModel} from "@angular/forms";
import {ProductModel} from "../../../model/entities/product.model";
import {NgClass} from "@angular/common";
import {SessionService} from "../../../model/utils/session.service";
import {RouterLink} from "@angular/router";
import {collection, doc, setDoc} from "firebase/firestore";
import {database} from "../../../firebase";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-inventory-add',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.scss'
})
export class InventoryAddComponent {
  currentUser: string = 'Sin usuario'
  batteryIsDisabled: boolean = false
  storageIsDisabled: boolean = false
  isLoading: boolean = false
  name: string = ''
  constructor(private session: SessionService, private toast: ToastrService) {
    this.currentUser = this.session.getUserValue$()?.email!!
  }

  async addToInventory(product: ProductModel) {
    this.isLoading = true
    let docRef = doc(collection(database, "inventory"))
    product.productId = docRef.id
    product.entryDate = new Date()
    product.batteryState = product.batteryState || 'No aplica'
    product.storageCapacity = product.storageCapacity || 'No aplica'
    product.storageUnit = product.storageUnit || 'No aplica'
    await setDoc(docRef, product)
      .then(() => {
        document.getElementById('inventoryAddForm')
        this.toast.success('Producto agregado al inventario correctamente.', 'NUEVO PRODUCTO')
      })
      .finally(() => {
        this.isLoading = false
      })
  }

  onBatteryCheckChange(event: Event) {
    // @ts-ignore
    this.batteryIsDisabled = event.target.checked
  }
  onStorageCheckChange(event: Event) {
    // @ts-ignore
    this.storageIsDisabled = event.target.checked
  }

  protected readonly NgModel = NgModel;
}
