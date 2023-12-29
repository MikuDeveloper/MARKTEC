import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase';
import { Router } from '@angular/router';
import { AlertService } from '../alerts/alert.service';
import { UserModel } from '../../model/entities/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user!: UserModel | null
  //isAuthenticated: boolean = false

  constructor(
    private router:Router,
    private alertService: AlertService
  ) { onAuthStateChanged(auth, (user) => {
    // Si existe un usuario, se asignan detalles del usuario a la propiedad 'user'.
     if (user) {
       this.user = {
         email: user.email, // Identificador único del usuario
         name: user.displayName//displayName puede ser nulo si no se proporciona al autenticar.
       };
        //para indicar que el usuario está autenticado.
        localStorage.setItem('isAuthenticated', 'true')
     } else { //Si no hay usuario.
        this.user = null
        localStorage.setItem('isAuthenticated', 'false')
     }
   });}

  async signUpUser(email : string, password : string) {
    return await createUserWithEmailAndPassword(auth, email, password)
  }
  async signInUser(email : string, password : string): Promise <void>{
    try {
      await signInWithEmailAndPassword(auth, email, password)
      this.router.navigate(['dashboard'])
    } catch (error: any) {
      console.error(error)
      if (error.code === 'auth/too-many-requests') {
       this.alertService.showAlert("Has realizado demasiados intentos de inicio de sesión fallidos. Informar al Administrador.");
      } else {
        this.alertService.showAlert("El usuario o la contraseña no son válidos") //Podemos usar un error.message
      }
    }
  }
  async updateUser() {

  }
  async deleteUser() {

  }
  async resetPassword(email : string) {
    return await sendPasswordResetEmail(auth, email)
  }
  async signOutUser (): Promise <void>{
    try {
      await signOut(auth)
      this.user = null
      this.router.navigate(['login']);
    } catch (error) {
      console.error(error);
    }
  }

  isLogged():boolean{
    const authenticated =  localStorage.getItem('isAuthenticated') === 'true' //comparar si el valor recuperado es estrictamente igual a la cadena de texto 
    //Verifica si el usuario está autenticado 
    if (authenticated){
        return true;        
    }else{
        return false
        
    }
  }
}
