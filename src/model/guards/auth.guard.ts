import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../api/authentication.service";

export const loginGuard =() =>{

    const router = inject(Router) //inject para obtener una instancia del servicio Router
    const authService = inject(AuthenticationService)
    // Agregamos un manejo simple del estado de autenticación
    authService.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    //Verifica si el usuario está autenticado utilizando la propiedad isLoggedIn del servicio 
    if (authService.isAuthenticated){ 
        return true;
        
    }else{
        router.navigate(['/login'])
        return false
        
    }
}