import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { NavService } from './navbar.utils';

@Injectable()
export class AuthGuard {
  constructor(private router : Router, private navService : NavService) {}
  canActivate: CanActivateFn = () => { //Se declara una propiedad canActivate que es de tipo CanActivateFn, función flecha que se ejecutará cuando se llame al guard
    return new Observable(observer => { //Se crea una nueva instancia de Observable 
      onAuthStateChanged(auth, user => { //Se utiliza la función de Firebase para observar cambios en el estado de autenticación.
        if (user) {
          observer.next(true) //Si hay un usuario autenticado, se notifica a los observadores (suscriptores) que la operación fue exitosa y devuelve true.
          this.navService.setData() //Se llama a un método setData en navService
        } else {
          this.router.navigate(['/login']).then().catch() //Se navega a la ruta /login utilizando el servicio Router.
          observer.next(false) //Se notifica a los observadores que la operación no fue exitosa
        }
        observer.complete() //Esto indica que no habrá más emisiones.
      })
    })
  }
}
