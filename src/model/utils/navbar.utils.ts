import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../../firebase';
@Injectable({//NavService puede ser inyectada en cualquier lugar de la aplicación
  providedIn: 'root'
})
export class NavService {
  private _showNav = new BehaviorSubject<boolean>(false); //Se declara un BehaviorSubject llamado _showNav, que se utiliza para gestionar si la barra de navegación debe mostrarse o no
  showNav$ = this._showNav.asObservable(); //Se expone como un observable, lo que permite a otros componentes suscribirse y recibir actualizaciones cuando cambie el estado de _showNav
  toggleNav(value: boolean) { //método que permite cambiar el estado de la barra de navegación.
    this._showNav.next(value);
  }

  private  _userData = new BehaviorSubject<User | null | undefined>(null); //almacena información sobre el usuario autenticado.
  userData$ = this._userData.asObservable()//Se expone como un observable
  setData() { // utiliza la función onAuthStateChanged de Firebase para observar cambios en el estado de autenticación. 
    onAuthStateChanged(auth, user => this._userData.next(user))
  }
  getData() { //devuelve el valor actual de _userData
    return this._userData.getValue()
  }
}

