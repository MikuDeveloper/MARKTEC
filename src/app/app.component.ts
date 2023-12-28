import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title : string = 'MARKTEC'
  selectedRoute : HTMLElement | undefined
  constructor(private router : Router) { }
  goToRoute(route : string) {
    //this.setAndRemoveSelectedStyle(route)
    this.closeSidebar()
    this.router.navigate([route]).then().catch()
  }
  closeSidebar() {
    const close : HTMLButtonElement = document.getElementById('btn-close-sidebar')! as HTMLButtonElement;
    close.click()
  }
  setAndRemoveSelectedStyle(id : string) {
    let sidebarItem : HTMLElement = document.getElementById(`${id}-route`)! as HTMLElement
    if (typeof this.selectedRoute !== 'undefined') this.selectedRoute.classList.remove('selected')
    this.selectedRoute = sidebarItem
    this.selectedRoute.classList.add('selected')
  }
}
