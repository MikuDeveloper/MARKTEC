import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
<<<<<<< Updated upstream
export class AppComponent {
  title = 'MARKTEC';
=======
export class AppComponent implements OnDestroy{
  title : string = 'MARKTEC'
  selectedRoute : HTMLElement | undefined
  subscription : Subscription
  constructor(private router : Router, private navService : NavService) {
    this.subscription = this.navService.showNav$.subscribe(value => this.showNav = value);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  goToRoute(route : string) {
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
  public showNav : boolean = false;
>>>>>>> Stashed changes
}
