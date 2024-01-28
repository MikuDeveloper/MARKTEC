import { Component } from '@angular/core';
import { NavService } from '../../model/utils/navbar.util';
import { FormsModule } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import { Router } from "@angular/router";
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase";
import firebase from "firebase/compat";
import AuthError = firebase.auth.AuthError;
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading: boolean = false
  constructor(private navService: NavService, private router: Router, private toast: ToastrService) {
    this.navService.toggleNav(false);
    onAuthStateChanged(auth, user => {
      if (user) this.goToHome()
    })
  }

  async login(form: any) {
    this.isLoading = true
    await signInWithEmailAndPassword(auth, form['login_email'], form['login_password'])
      .then(() => {
        this.goToHome()
      })
      .catch((exception : AuthError) => {
        this.toast.error(this.getLoginErrorMessage(exception.code), 'ERROR DE INICIO DE SESIÓN')
      })
      .finally(() => {
        this.isLoading = false
      })
  }

  goToHome() {
    this.router.navigate(['/dashboard']).then()
  }

  getLoginErrorMessage(code : string) : string {
    switch (code) {
      case 'auth/invalid-credential': return 'Correo o contraseña incorrectos.'
      case 'auth/invalid-email': return 'Formato de email no válido.'
      case 'auth/too-many-requests': return 'Demasiados intentos fallidos. Inténtelo de nuevo en unos segundos.'
      case 'auth/network-request-failed': return 'Verifique su conexión a internet.'
      case 'auth/internal-error': return 'Error interno del servidor.'
      default: return code
    }
  }

}