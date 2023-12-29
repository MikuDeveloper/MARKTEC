import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { User } from '../interfaces/user';
import { auth } from '../../assets/firebase';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/alerts/alert.service';

@Injectable({
 providedIn: 'root'
})
export class AuthService {
 user!: User | null
 isAuthenticated: boolean = false

 constructor(
 private router:Router,
 private alertService: AlertService
 ) {//observar cambios en el estado de autenticación del usuario.
   onAuthStateChanged(auth, (user) => {
    // Si existe un usuario, se asignan detalles del usuario a la propiedad 'user'.
     if (user) {
       this.user = {
         id: user.uid, // Identificador único del usuario
         email: user.email,
         userName: user.displayName //displayName puede ser nulo si no se proporciona al autenticar.

       };
       this.isAuthenticated = true //para indicar que el usuario está autenticado.
     } else { //Si no hay usuario.
       this.user = null;
       this.isAuthenticated = false
     }
   });
 }

 async login(email: string, password: string): Promise<void> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error(error);
    if (error.code === 'auth/too-many-requests') {
     this.alertService.showAlert("Has realizado demasiados intentos de inicio de sesión fallidos. Informar al Administrador.");
    } else {
      this.alertService.showAlert("El usuario o la contraseña no coinciden");//Podemos usar un error.message
    }
    this.isAuthenticated = false
  }
 }

 async logout(): Promise<void> {
  try {
    await signOut(auth)
    this.user = null
    this.isAuthenticated  = false 
    this.router.navigate(['login']);
  } catch (error) {
    console.error(error);
  }
 }

 get isLoggedIn(): boolean {
 return this.isAuthenticated
 }
}
