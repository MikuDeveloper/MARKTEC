import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ProductModel} from "../../../model/entities/product.model";
import {NgClass} from "@angular/common";
import {SessionService} from "../../../model/utils/session.service";

@Component({
  selector: 'app-inventory-add',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.scss'
})
export class InventoryAddComponent {
  currentUser: string = 'Sin usuario'
  constructor(private session: SessionService) {
    this.currentUser = this.session.getUserValue$()?.email!!
  }

  addToInventory(product: ProductModel) {
    console.log(product)
  }
}
