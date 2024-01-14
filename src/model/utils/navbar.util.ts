import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NavService {
  private _showNav = new BehaviorSubject<boolean>(false);
  showNav$ = this._showNav.asObservable();
  toggleNav(value: boolean) {
    this._showNav.next(value);
  }
}

