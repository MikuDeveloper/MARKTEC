import { Component } from '@angular/core';
import { NavService } from "../../model/utils/navbar.utils";
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerModel } from '../../model/entities/customer.model';
import { FirestoreService } from '../../model/api/firestore.service';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [NgIf,CommonModule,FormsModule,ReactiveFormsModule,],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  mostrarBoton:boolean=true
  mostrarTarjeta:boolean=false
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
  originalCustomers: CustomerModel[] = []
  customers: CustomerModel[] = []
  searchCustomers: string =''
  searchSale: string = ''
  constructor(private navService: NavService, private databaseService:FirestoreService) {
    this.navService.toggleNav(true);

  }
  async ngOnInit(){
    this.originalCustomers = await this.databaseService.getCollectionDataC("customers");
    this.customers = [...this.originalCustomers]
  }

  onSearchChange(searchValues:string): void {
      this.searchCustomers = searchValues
      const searchValue = this.removeAccents(this.searchCustomers.toLowerCase());
      this.customers = this.originalCustomers.filter(customer =>
      this.removeAccents(customer.name.toLowerCase()).includes(searchValue) ||
      this.removeAccents(customer.voterKey.toLowerCase()).includes(searchValue)
    );
  }

  selectCustomer(customer: any): void {
    this.searchCustomers = customer.name;
    this.customers = [];
  }

  removeAccents(str: string): string {
   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  guardarForm(form:CustomerModel){
    this.customerNew = form
    console.log(this.customerNew)
    this.mostrarBoton = false
    this.mostrarTarjeta = true
  }
}
