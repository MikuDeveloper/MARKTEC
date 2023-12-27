import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MARKTEC';
  constructor(private router : Router) {
  }
  goToInventory() {
    let close: HTMLButtonElement = document.getElementById('close')! as HTMLButtonElement;
    close.click()
    this.router.navigate(['inventory']).then().catch()
  }

  protected readonly alert = alert;
}
