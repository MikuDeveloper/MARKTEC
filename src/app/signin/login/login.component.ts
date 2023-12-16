import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password)
        .then(() => {
          // Redirigir al usuario a la página deseada después del inicio de sesión
          this.router.navigate(['/home']); // Asegúrate de tener una ruta llamada 'home'
        })
        .catch(error => {
          console.error('Error en el inicio de sesión:', error);
          this.errorMessage = 'Error en el inicio de sesión. Verifica tus credenciales.';
        });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }
}
