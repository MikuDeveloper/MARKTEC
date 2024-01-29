import { CanActivateFn, Router } from '@angular/router';
import { Observable } from "rxjs";
import { onAuthStateChanged } from "firebase/auth";
import { Injectable } from "@angular/core";
import { auth } from "../../firebase";

@Injectable()
export class RoutesGuard {
  constructor(private router: Router) { }
  canActivate: CanActivateFn = () => {
    return new Observable(observer => {
      onAuthStateChanged(auth, user => {
        if (user) {
          observer.next(true)
        } else {
          observer.next(false)
          this.router.navigate(['/login']).then().catch()
        }
        observer.complete() //Esto indica que no habrá más emisiones.
      })
    })
  }
}
