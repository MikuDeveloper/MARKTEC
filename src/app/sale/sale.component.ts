import { Component, ViewChild } from '@angular/core';
import { NavService } from "../../model/utils/navbar.util";
import { CustomerModel } from '../../model/entities/customer.model';
import { FirestoreService } from '../../model/api/firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead.module';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [FormsModule,CommonModule,NgbTypeaheadModule],
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

  model : string = ''

  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private navService: NavService,private databaseService: FirestoreService) {
    this.navService.toggleNav(true);
  }
  async ngOnInit(){
    // Aquí, estás obteniendo datos de la colección "customers" de tu base de datos.
    // La función getCollectionDataC() es una función asíncrona, por lo que utilizas 'await' para esperar a que se resuelva antes de continuar.
    this.originalCustomers = await this.databaseService.getCollectionDataC("customers");
    // Estás haciendo una copia de los datos originales de los clientes para poder manipularlos sin alterar los datos originales.
    this.customer = [...this.originalCustomers]
    console.log(this.customer)
  }


  search:  OperatorFunction<string, readonly string[]> = (text$: Observable<string>)=> {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) => (term === '' ? this.customer : this.customer.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
      v.voterKey.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)),
      map(customers => customers.map(customer => `${customer.name} - ${customer.voterKey}`)) // <-- Agrega esta línea
    );
  };
  onSelect(event: NgbTypeaheadSelectItemEvent) {
    const selectedValue = event.item; // Esto será algo como "Nombre - ClaveDeVotante"
    const [name, voterKey] = selectedValue.split(' - ') // Separa el nombre y la clave de votante
    console.log(name,voterKey)
    // Busca el cliente seleccionado en tu arreglo de clientes
    const selectedCustomer = this.customer.find(customer => customer.name === name && customer.voterKey === voterKey);

    if (selectedCustomer) {
      // Aquí puedes hacer lo que quieras con el cliente seleccionado
      console.log(selectedCustomer)
      this.customers = selectedCustomer
      this.showCard = true
      this.showBtn = false
    }
  }



  // Método para recolectar los datos del modal y mostrarlos en el
  addNewCustomer(form:CustomerModel){
    console.log(form)
    this.showCard = true
    this.showBtn = false
    form.status = 'sin deuda'
  }
}
