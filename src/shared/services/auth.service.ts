import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { User } from '../interfaces/user';
import { auth } from '../../assets/firebase';
import { Router } from '@angular/router';

@Injectable({
 providedIn: 'root'
})
export class AuthService {
 user!: User | null;

 constructor(private router:Router) { }

 async login(email: string, password: string): Promise<void> {
   try {
     const userCredential = await signInWithEmailAndPassword(auth, email, password);
     localStorage.setItem('authToken', userCredential.user.uid);
     this.user = {
       id: userCredential.user.uid,
       email: userCredential.user.email,
       userName: userCredential.user.displayName
     };
   } catch (error) {
     console.error(error);
   }
 }

 async register(email: string, password: string): Promise<void> {
   try {
     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
     localStorage.setItem('authToken', userCredential.user.uid);
     this.user = {
       id: userCredential.user.uid,
       email: userCredential.user.email,
       userName: userCredential.user.displayName
     };
   } catch (error) {
     console.error(error);
   }
 }

 async logout(): Promise<void> {
   try {
     await signOut(auth);
     localStorage.removeItem('authToken'); 
     this.user = null;
     this.router.navigate(['/login']);
   } catch (error) {
     console.error(error);
   }
 }

 get isLoggedIn(): boolean {
  return !!localStorage.getItem('authToken');
 }
}
