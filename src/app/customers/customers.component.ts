import { Component } from '@angular/core';
import { NavService } from "../../model/utils/navbar.utils";
import { FirestoreService } from '../../model/api/firestore.service';
import { AsyncPipe,NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerModel } from '../../model/entities/customer.model';
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [AsyncPipe,NgForOf,FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  customers : Promise<CustomerModel[]> | undefined
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
    this.customers = this.databaseService.getCollectionDataC("customers")
  }
  //Método para
  addNewDocument(form : CustomerModel){
    let variableType: string = typeof form.email;
    console.log(variableType)
      this.databaseService.addDocumentC("customers",form,form.voterKey).then((docRef) => {
      });
    }

    //Método para pasar los datos de la tarjetas al modal de eliminación a través de otra interfaz
    clickInfo(customers:CustomerModel){
      this.infoCustomer = customers
    }

    deleteDocument(id:string){
      this.databaseService.deleteDocument("customers",id).then(()=> {
        this.customers = this.databaseService.getCollectionDataC("customers")
      });
    }

    updateDocument(form: CustomerModel){
      form.email = this.infoCustomer.email
      console.log(form)
      console.log(this.infoCustomer)
      this.databaseService.updateDocument("customers",form.email,form)
    }
}
