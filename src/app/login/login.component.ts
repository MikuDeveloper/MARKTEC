import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.utils";
import { AuthenticationService } from '../../model/api/authentication.service';
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
    private navService: NavService,
    private authService: AuthenticationService,
    public alertService: AlertService
  ){
    this.navService.toggleNav(false);
  }

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
