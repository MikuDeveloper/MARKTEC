import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.utils";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private navService: NavService) {
    this.navService.toggleNav(false);
  }
}
