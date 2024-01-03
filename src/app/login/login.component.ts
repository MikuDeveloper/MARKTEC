import { Component } from '@angular/core';
import { AuthenticationService } from '../../model/api/authentication.service';
import { Router } from '@angular/router';
//import { AlertService } from '../../model/alerts/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NavService} from "../../model/utils/navbar.utils";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = ''
  password: string = ''
  showError: string | null = null

  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    private navService: NavService
    //public alertService: AlertService
  ){
    this.navService.toggleNav(false);
  }

  clickLogin(): void {
    this.showError = null
    if (!this.email || !this.password) {
      this.showError ='Por favor, completa todos los campos.'
    } else {
      this.authService.signInUser(this.email, this.password)
        .catch(error => {
          this.showError = error.message; //Muestra el error lanzado
          //console.error(error.message)
        });
    }
  }
}
