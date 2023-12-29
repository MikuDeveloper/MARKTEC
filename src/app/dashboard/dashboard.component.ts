import { Component } from '@angular/core';
import { AuthenticationService} from '../../model/api/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){}

  logOut():void{
    this.authService.signOutUser()
    
  }
}
