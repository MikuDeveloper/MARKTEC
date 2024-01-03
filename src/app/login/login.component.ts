import { Component } from '@angular/core';
import { NavService } from '../../model/utils/navbar.utils';
import { AuthenticationService } from '../../model/api/authentication.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

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
  constructor(private navService: NavService, private authService : AuthenticationService) {
    this.navService.toggleNav(false);
  }

  async login(form: any) {
    await this.authService.signInUser(form['login_email'], form['login_password'])
  }
}
