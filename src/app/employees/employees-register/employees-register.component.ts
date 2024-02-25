import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-employees-register',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './employees-register.component.html',
  styleUrl: './employees-register.component.scss'
})
export class EmployeesRegisterComponent {

}
