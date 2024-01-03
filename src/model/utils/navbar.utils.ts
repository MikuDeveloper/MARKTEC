import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../../firebase';
@Injectable({
  providedIn: 'root'
})
export class NavService {
  private _showNav = new BehaviorSubject<boolean>(false);
  showNav$ = this._showNav.asObservable();
  toggleNav(value: boolean) {
    this._showNav.next(value);
  }

  private  _userData = new BehaviorSubject<User | null | undefined>(null);
  userData$ = this._userData.asObservable()

  setData() {
    onAuthStateChanged(auth, user => this._userData.next(user))
  }

  getData() {
    return this._userData.getValue()
  }
}

