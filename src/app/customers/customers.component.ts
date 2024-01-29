import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../model/api/firestore.service';
import { AsyncPipe,NgForOf } from '@angular/common';
import { FormControl, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomerModel } from '../../model/entities/customer.model';
import { NavService } from '../../model/utils/navbar.util';
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [AsyncPipe,NgForOf,FormsModule,ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  customers : CustomerModel[] =[]
  originalCustomers : CustomerModel[] =[]
  searchValue : string = ''
  searchControl: string=''
  selectedFilter: string = ''
  infoCustomer : CustomerModel = {
    voterKey : '',
    name : '',
    address : '',
    phoneNumber : '',
    email : '',
    facebook : '',
    status:'',
    debt: 0
  }
  constructor(private navService: NavService, private databaseService:FirestoreService) {
    this.navService.toggleNav(true);
  }
// Este es un método de ciclo de vida de Angular que se ejecuta después de que Angular haya inicializado todos los datos vinculados a propiedades.
async ngOnInit(){
  // Aquí, estás obteniendo datos de la colección "customers" de tu base de datos.
  // La función getCollectionDataC() es una función asíncrona, por lo que utilizas 'await' para esperar a que se resuelva antes de continuar.
  this.originalCustomers = await this.databaseService.getCollectionDataC("customers");

  // Estás haciendo una copia de los datos originales de los clientes para poder manipularlos sin alterar los datos originales.
  this.customers = [...this.originalCustomers]
}

// Esta función se llama cuando cambia el valor de búsqueda.
onSearchChange(): void {
  // Conviertes el valor de búsqueda a minúsculas y le quitas los acentos.
  const searchValue = this.removeAccents(this.searchValue.toLowerCase());

  // Filtras los clientes basándote en el valor de búsqueda. Si el nombre o la clave del votante del cliente incluye el valor de búsqueda, ese cliente se incluirá en la lista de clientes.
  this.customers = this.originalCustomers.filter(customer =>
    this.removeAccents(customer.name.toLowerCase()).includes(searchValue) ||
    this.removeAccents(customer.voterKey.toLowerCase()).includes(searchValue)
  );
}

// Esta función quita los acentos de una cadena.
removeAccents(str: string): string {
  // Utilizas el método normalize() para descomponer la cadena en su forma normalizada (NFD - Forma Normal Descompuesta)
  // Luego, utilizas una expresión regular para reemplazar los caracteres Unicode de los acentos (diacríticos) por una cadena vacía.
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

  //Método para agregar un nuevo documento
  addNewDocument(form : CustomerModel){
    let variableType: string = typeof form.email;
    console.log(variableType)
      this.databaseService.addDocumentC("customers",form,form.voterKey).then(async (docRef) => {
        this.customers = await this.databaseService.getCollectionDataC("customers")
      });
    }

    //Método para pasar los datos de la tarjetas al modal de eliminación a través de otra interfaz
    clickInfo(customers:CustomerModel){
      this.infoCustomer = customers
    }

    deleteDocument(id:string){
      this.databaseService.deleteDocument("customers",id).then(async ()=> {
        this.customers = await this.databaseService.getCollectionDataC("customers")
      });
    }

    updateDocument(form: CustomerModel){
      form.email = this.infoCustomer.email
      console.log(form)
      console.log(this.infoCustomer)
      this.databaseService.updateDocument("customers",form.email,form)
    }
    //Método para filtrar sin deuda
    async filter(){
      console.log(this.selectedFilter,this.customers)
      if(this.selectedFilter == "sin deuda"){
      this.customers = await this.databaseService.getFilterCollection("status","sin deuda")
      console.log(this.selectedFilter,this.customers)
      }else if(this.selectedFilter == "adeuda"){
      this.customers = await this.databaseService.getFilterCollection("status","adeuda")
      }else
      this.customers = await this.databaseService.getCollectionDataC("customers")
    }

}
