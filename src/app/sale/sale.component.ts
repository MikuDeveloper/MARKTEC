import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";
import { CustomerModel } from '../../model/entities/customer.model';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../model/api/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  customers : CustomerModel = {
    voterKey : '',
    name : '',
    address : '',
    phoneNumber : '',
    email : '',
    facebook : '',
    status:'',
    debt: 0
  }
  showCard : boolean = false
  showBtn : boolean = true
  constructor(private navService: NavService,private databaseService: FirestoreService) {
    this.navService.toggleNav(true);

  }
  // Método para recolectar los datos del modal y mostrarlos en el
  addNewCustomer(form:CustomerModel){
    console.log(form)
    this.showCard = true
    this.showBtn = false
    form.status = 'sin deuda'
  }
}
