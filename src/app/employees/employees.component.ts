import { Component } from '@angular/core';
import { NavService } from "../../model/utils/navbar.utils";
import { FirestoreService } from '../../model/api/firestore.service';
import { auth } from '../../firebase';
import { AuthenticationService } from '../../model/api/authentication.service';
import { AsyncPipe,NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Objeto } from '../../model/entities/firestore-interface';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [AsyncPipe,NgForOf,FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  employees : Promise<Objeto[]> | undefined
  infoEmployee: Objeto = {
    email: '', name: '', address: '', phoneNumber: '', role: ''
  }

  constructor(private navService: NavService,private databaseService : FirestoreService) {
    this.navService.toggleNav(true);
    this.employees = this.databaseService.getCollectionData("employees")
    console.log(this.employees)
  }

      /*
      this.databaseService.addDocument("employees", this.employees_doc).then(async(temporaryPassword) => {
        console.log(this.employees_doc)
        // Obtén la contraseña temporal generada durante la creación del usuario en Firestore
        
        // Luego, registra al usuario en Firebase Authentication con la contraseña temporal
        try {
          console.log('entra en el try')
          await this.authenticationService.signUpUser(this.employees_doc.email, temporaryPassword);
    
          console.log('Usuario registrado en Firebase Authentication:', this.employees_doc.email);
        } catch (error) {
          console.error('Error al registrar el usuario en Firebase Authentication:', error);
          // Puedes manejar el error de alguna manera, como mostrar un mensaje al usuario
        }
        console.log('fuera del try catch')
              // Luego, enviar el correo con la contraseña temporal
              this.authenticationService.sendVerificationEmail(this.employees_doc.email, temporaryPassword);
    */
  addNewDocument(form : Objeto){
    console.log(form)
      this.databaseService.addDocument("employees",form,form.email).then((docRef) => {
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

    updateDocument(form: Objeto){
      form.email = this.infoEmployee.email
      console.log(form)
      console.log(this.infoEmployee)
      this.databaseService.updateDocument("employees",form.email,form)
    }
    
}
