import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerModel } from '../../model/entities/customer.model';
import { FirestoreService } from '../../model/api/firestore.service';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { NavService } from '../../model/utils/navbar.util';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [NgIf,CommonModule,FormsModule,ReactiveFormsModule,],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
customerNew: CustomerModel = {
  voterKey : '',
  name : '',
  address : '',
  phoneNumber : '',
  email : '',
  facebook : '',
  status:'',
  debt: 0
}
searchCustomers:string =''
searchSale:string = ''
mostrarTarjeta : boolean =true
mostrarBoton: boolean = true
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }
  onSearchChange(){

  }
}
