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
  originalCustomers:CustomerModel[] =[]
  customer:CustomerModel[] =[]
  showCard : boolean = false
  showBtn : boolean = true
  constructor(private navService: NavService,private databaseService: FirestoreService) {
    this.navService.toggleNav(true);
  }
  async ngOnInit(){
    // Aquí, estás obteniendo datos de la colección "customers" de tu base de datos.
    // La función getCollectionDataC() es una función asíncrona, por lo que utilizas 'await' para esperar a que se resuelva antes de continuar.
    this.originalCustomers = await this.databaseService.getCollectionDataC("customers");
    // Estás haciendo una copia de los datos originales de los clientes para poder manipularlos sin alterar los datos originales.
    this.customer = [...this.originalCustomers]
  }
  // Método para recolectar los datos del modal y mostrarlos en el
  addNewCustomer(form:CustomerModel){
    console.log(form)
    this.showCard = true
    this.showBtn = false
    form.status = 'sin deuda'
  }
}
