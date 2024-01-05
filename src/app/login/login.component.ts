import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../model/utils/navbar.utils';
import { AuthenticationService } from '../../model/api/authentication.service';
import { FormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgIf
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
  async login(form: any) {
    await this.authService.signInUser(form['login_email'], form['login_password'])
    .catch(error => {
      this.showError = error.message; //Muestra el error lanzado
    });
  }

}