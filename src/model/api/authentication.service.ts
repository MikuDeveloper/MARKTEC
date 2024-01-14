import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  async signUpUser(email : string, password : string) {
    return await createUserWithEmailAndPassword(auth, email, password)
  }
  async signInUser(email : string, password : string) {
    return await signInWithEmailAndPassword(auth, email, password)
  }
  async updateUser() {

  }
  async deleteUser() {

  }
  async resetPassword(email : string) {
    return await sendPasswordResetEmail(auth, email)
  }
  async signOutUser () {
    await signOut(auth)
  }
}
