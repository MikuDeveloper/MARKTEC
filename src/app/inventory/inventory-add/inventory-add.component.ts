import {AfterViewInit, Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
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
export class InventoryAddComponent implements AfterViewInit {
  currentUser: string = 'Sin usuario'
  isLoading: boolean = false
  addForm: HTMLFormElement | undefined

  constructor(private session: SessionService, private toast: ToastrService) {
    this.currentUser = this.session.getUserValue$()?.email!!
  }

  ngAfterViewInit(): void {
    this.addForm = <HTMLFormElement>document.getElementById('inventoryAddForm')
  }

  async addToInventory(product: ProductModel) {
    this.isLoading = true
    let docRef = doc(collection(database, "inventory"))
    product.productId = docRef.id
    product.entryDate = new Date()
    product.batteryState = product.batteryState || 'No aplica'
    product.storageCapacity = product.storageCapacity || 'No aplica'
    product.storageUnit = product.storageUnit || 'No aplica'
    product.location_person = product.location_person || 'No aplica'
    await setDoc(docRef, product)
      .then(() => {
        document.getElementById('inventoryAddForm')
        this.toast.success('Producto agregado al inventario correctamente.', 'NUEVO PRODUCTO')
        if (this.addForm) this.addForm.reset()
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}
