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
    // Verificar si la información de la sesión existe en el almacenamiento local
    const user = localStorage.getItem('user');
    // O en el almacenamiento de la sesión
    // const user = sessionStorage.getItem('user');

    if (user) {
      // Si la información de la sesión existe, redirigir al usuario a la página de inicio
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password)
        .then(() => {
          // Guardar la información de la sesión en el almacenamiento local
          localStorage.setItem('user', JSON.stringify(this.email));
          // O en el almacenamiento de la sesión
          sessionStorage.setItem('user', JSON.stringify(this.email));
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
