import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { NavService } from './navbar.utils';

@Injectable()
export class AuthGuard {
  constructor(private router : Router, private navService : NavService) {}
  canActivate: CanActivateFn = () => {
    return new Observable(observer => {
      onAuthStateChanged(auth, user => {
        if (user) {
          observer.next(true)
          this.navService.setData()
        } else {
          this.router.navigate(['/login']).then().catch()
          observer.next(false)
        }
        observer.complete()
      })
    })
  }
}
