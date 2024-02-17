import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NavService } from "../../model/utils/navbar.util";
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomerModel } from '../../model/entities/customer.model';
import { FirestoreService } from '../../model/api/firestore.service';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DebtModel } from '../../model/entities/debt.model';
import { ProductModel } from '../../model/entities/product.model';

@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgClass,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NgbTypeaheadModule
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

  debts : DebtModel [] = []

  items : ProductModel [] = []

  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead; // varibale de instancia
  model : string = '' // [(ngModel)] variable
  focus$ = new Subject<string>(); // variable para el focus que permite mostrar 10 opciones sin haber escrito aún.
  click$ = new Subject<string>(); // variable para detectar cuando el usuario da click en la barra de búsqueda.

  constructor(private navService: NavService, private databaseService:FirestoreService,private router:Router) {
    this.navService.toggleNav(true);
    const currentDate = new Date();
    this.defaultDate = currentDate.toISOString().substring(0, 10); // Formato 'YYYY-MM-DD'
    this.defaultTime = this.formatTime(currentDate); // Formato 'HH:MM'
  }

  async ngOnInit(){
    // La función getCollectionDataC() es una función asíncrona, por lo que utilizas 'await' para esperar a que se resuelva antes de continuar.
    this.originalCustomers = await this.databaseService.getCollectionDataC("customers");
    // Estás haciendo una copia de los datos originales de los clientes para poder manipularlos sin alterar los datos originales.
    this.customers = [...this.originalCustomers]
    this.debts = await this.databaseService.getCollectionDebt('debts')
    this.items = await this.databaseService.getCollectionDataTest('inventory')
    console.log(this.debts)
  }
  isDetailRouteActive():boolean{
    return this.router.url.includes('details')
  }
    // Método para búsqueda de Customers ya existentes
    search:  OperatorFunction<string, readonly string[]> = (text$: Observable<string>)=> {
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
      const inputFocus$ = this.focus$
      //Mapeo de respuesta  apartir de un filtrado por propiedades name y voterKey
      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map((term) => (term === '' ? this.customers : this.customers.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
        v.voterKey.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)),
        map(customers => customers.map(customer => `${customer.name} - ${customer.voterKey}`)) // <-- Agrega esta línea
      );
    };
    //Método para que con un parámetro de tipo event$ pueda manipular la selección que haga el ususario de un Customer
    onSelect(event: NgbTypeaheadSelectItemEvent) {
      const selectedValue = event.item; // Esto será algo como "Nombre - ClaveDeVotante"
      const [name, voterKey] = selectedValue.split(' - ') // Separa el nombre y la clave de votante
      // Busca el cliente seleccionado en tu arreglo de clientes
      const selectedCustomer = this.customers.find(customers => customers.name === name && customers.voterKey === voterKey);

      if (selectedCustomer) {
        // Aquí puedes hacer lo que quieras con el cliente seleccionado
        console.log(selectedCustomer)
        this.customer = selectedCustomer
      }
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
