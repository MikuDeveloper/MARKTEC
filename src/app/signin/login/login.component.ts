import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { AlertService } from '../../../model/alerts/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  email: string = ''
  password: string = ''
  showError = false

  constructor(
    private authService: AuthService, 
    private router: Router,
    public alertService: AlertService
    ) {}

  ngOnInit(): void {
  }

  clickLogin(): void {
    if (!this.email || !this.password) {
      this.alertService.showAlert('Por favor, completa todos los campos.')
    } else {
      this.authService.login(this.email, this.password)
        .then(() => {
          // Verificar nuevamente si el usuario está autenticado antes de redirigir
          if (this.authService.isLoggedIn) {
            // Redirigir al usuario a la página deseada después del inicio de sesión
            this.router.navigate(['home']);
          } else {
            this.alertService.showAlert('El correo o la contraseña no coinciden');
          }
        })
        .catch(error => {
          this.alertService.showAlert(error.message);
          
        });
    }
  }
}
