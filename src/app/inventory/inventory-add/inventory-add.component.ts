import {Component} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
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
  isLoading: boolean = false

  constructor(private session: SessionService, private toast: ToastrService) {
    this.currentUser = this.session.getUserValue$()?.email!!
  }

  async addToInventory(product: ProductModel, form: NgForm) {
    this.isLoading = true
    let docRef = doc(collection(database, "inventory"))
    product.productId = docRef.id
    product.entryDate = new Date()
    product.batteryState = product.batteryState || 'No aplica'
    product.storageCapacity = product.storageCapacity || 'No aplica'
    product.storageUnit = product.storageUnit || 'No aplica'
    product.location_employee = product.location_employee || 'No aplica'
    product.location_customer = product.location_customer || ''
    await setDoc(docRef, product)
      .then(() => {
        this.toast.success('Producto agregado al inventario correctamente.', 'NUEVO PRODUCTO')
        form.resetForm({employeeId: this.session.getUserValue$()?.email!!})
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}
