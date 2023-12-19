import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  constructor(private authService: AuthService, private router: Router) {}
  
  navigateToTics() {
    this.router.navigate(['login']);
  }

  logout(): void {
    this.authService.logout();
    //this.router.navigate(['/login']); podría no ir
   }
}
