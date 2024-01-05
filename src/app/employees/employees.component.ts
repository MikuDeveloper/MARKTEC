import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.utils";
import { FirestoreService } from '../../model/api/firestore.service';
import { Objeto } from '../../model/entities/firestore-interface';
import {AsyncPipe,NgForOf} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [AsyncPipe,NgForOf,FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  employees : Promise<Objeto[]> | undefined
  employees_doc :  Objeto = {
    email: '',
    name: '',
    address: '',
    phoneNumber: '',
    role: '',
    id:''
  }
  infoEmployee: Objeto = {
    email: '',
    name: '',
    address: '',
    phoneNumber: '',
    role: '',
    id:''
  }
  constructor(private navService: NavService,private databaseService : FirestoreService) {
    this.navService.toggleNav(true);
    this.employees = this.databaseService.getCollectionData("employees")
  }

    addNewDocument() {
      this.databaseService.addDocument("employees", this.employees_doc,this.employees_doc.email).then((docRef) => {
        console.log(this.employees_doc)
      });
    }
    //Método para pasar los datos de la tarjetas al modal de eliminación a través de otra interfaz
    clickInfo(employee:Objeto){
      this.infoEmployee =employee
    }

    deleteDocument(id:string){
      this.databaseService.deleteDocument("employees",id).then(()=> {
        this.employees = this.databaseService.getCollectionData("employees")
      });
    }

    updateDocument(id:string){
      console.log(id,this.infoEmployee)
      this.databaseService.updateDocument("employees",id,this.infoEmployee)
    }
}
