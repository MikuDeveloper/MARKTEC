import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user$ = new BehaviorSubject<User | null>(null)
  constructor() {
    onAuthStateChanged(auth, user => this.user$.next(user))
  }
  getUser$(): Observable<User | null> {
    return this.user$.asObservable();
  }

  getUserValue$() {
    return this.user$.getValue()
  }
}
