import { Component } from '@angular/core';
import { AuthenticationService } from '../../model/api/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../../model/alerts/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = ''
  password: string = ''
  showError = false

  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    public alertService: AlertService
  ){}

  clickLogin(): void {
    if (!this.email || !this.password) {
      this.alertService.showAlert('Por favor, completa todos los campos.')
    } else {
      this.authService.signInUser(this.email, this.password)
        .catch(error => {
          this.alertService.showAlert(error.message);
        });
    }
  }
}
