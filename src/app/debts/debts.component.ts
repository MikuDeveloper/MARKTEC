import { Component, TemplateRef } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomerModel } from '../../model/entities/customer.model';
import { FirestoreService } from '../../model/api/firestore.service';

@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgClass,
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})



export class DebtsComponent {
  defaultDate: string;
  defaultTime: string;

  originalCustomers : CustomerModel [] = []
  customers : CustomerModel [] = []
  customer : CustomerModel = {
    address: '',
    debt: 0,
    email: '',
    name: '',
    phoneNumber: '',
    facebook: '',
    status: '',
    voterKey: ''
  }
  constructor(private navService: NavService, private databaseService:FirestoreService) {
    this.navService.toggleNav(true);
    const currentDate = new Date();
    this.defaultDate = currentDate.toISOString().substring(0, 10); // Formato 'YYYY-MM-DD'
    this.defaultTime = this.formatTime(currentDate); // Formato 'HH:MM'
  }

  async ngOnInit(){
    // Aquí, estás obteniendo datos de la colección "customers" de tu base de datos.
    // La función getCollectionDataC() es una función asíncrona, por lo que utilizas 'await' para esperar a que se resuelva antes de continuar.
    this.originalCustomers = await this.databaseService.getCollectionDataC("customers");
    // Estás haciendo una copia de los datos originales de los clientes para poder manipularlos sin alterar los datos originales.
    this.customers = [...this.originalCustomers]
  }

  private formatTime(date: Date): string {
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    // Asegurarse de que los minutos tengan dos dígitos
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }

    return hours + ':' + minutes;
  }
}
