import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { Router } from '@angular/router';
import { UserModel } from '../../model/entities/user.model';
import { auth } from '../../firebase';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject = new BehaviorSubject<UserModel | null>(null);
  
  user$ = this.userSubject.asObservable();

  constructor(
    private router:Router,
    private firestoreService: FirestoreService
  ) { 
    onAuthStateChanged(auth, async (user) => {
     if (user) {// Si existe un usuario, se asignan detalles del usuario a la propiedad 'user'.
      try{
        const userData = await this.firestoreService.getCollectionData('employees');// Extraer datos del usuario desde Firestore
        const userByEmail = userData.find((data) => data.email === user.email);// Filtrar los datos del usuario correspondiente al correo electrónico actual
        if(userByEmail){
          this.userSubject.next ({
         email: user.email, // Identificador único del usuario
         name: userByEmail.name,//displayName puede ser nulo si no se proporciona al autenticar.
         role: userByEmail.role
       });
        }else{
          console.error(`No se encontraron datos para el usuario con correo electrónico ${user.email}`);  
        }
      }catch(error){
        console.error('Error al obtener datos del usuario desde Firestore:', error);
      } 
      
     } else { //Si no hay usuario.
        this.userSubject.next(null)
     }
   });
  }

  async signUpUser(email : string, password : string) {
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  async signInUser(email : string, password : string): Promise <void>{
    try {
      await signInWithEmailAndPassword(auth, email, password)   
    } catch (error: any) {
      console.error(error)
      switch(error.code){
        case 'auth/invalid-email':
          throw new Error ("*El correo no es válido*")
          break
        case  'auth/invalid-credential':
          throw new Error("*La contraseña no es válido*")  
        break
        case 'auth/network-request-failed':
          throw new Error ("*No hay conexión a la Red. Intentelo más tarde*")
          break
        default:
          throw new Error ('*El usuario o la contraseña no son válidos*')
      }
    }
  }
  async updateUser() {

  }
  async deleteUser() {

  }
  async resetPassword(email : string) {
    return await sendPasswordResetEmail(auth, email)
  }
  
  async signOutUser (): Promise <void>{
    try {
      await signOut(auth)
      this.router.navigate(['login'])
    } catch (error) {
      console.error(error)
    }
  }

  /*isLogged():Observable<boolean>{
    return this.isAuthenticated$
  }
  getUser(): Observable<UserModel | null> {
    return this.user$ 
  }
  logOut(): void{
    this.authService.signOutUser() 
  }
  */
}
