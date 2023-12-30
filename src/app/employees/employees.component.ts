import { Component } from '@angular/core';
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
  constructor(private databaseService : FirestoreService){
    this.employees = this.databaseService.getCollectionData("employees")
  }
    addNewDocument() {
      this.databaseService.addDocument("employees", this.employees_doc).then((docRef) => {

        console.log(this.employees_doc)
      });
    }
    deleteDocument(id?:string){
      id =''+id
      this.databaseService.deleteDocument("employees",id)
    }
    updateDocument(id:string){
      this.databaseService.updateDocument("employees",id,this.employees_doc)
    }
}
