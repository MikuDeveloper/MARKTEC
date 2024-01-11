import { Component } from '@angular/core';
import { NavService } from '../../model/utils/navbar.util';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from "@angular/router";
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private navService: NavService, private router: Router) {
    this.navService.toggleNav(false);
    onAuthStateChanged(auth, user => {
      if (user) this.goToHome()
    })
  }

  async login(form: any) {
    await signInWithEmailAndPassword(auth, form['login_email'], form['login_password'])
    this.goToHome()
  }

  goToHome() {
    this.router.navigate(['/dashboard']).then()
  }
}
