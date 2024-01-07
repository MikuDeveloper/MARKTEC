import {Component, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User, signOut } from 'firebase/auth'
import { NavService } from '../model/utils/navbar.utils';
import { Subscription } from 'rxjs';
import { auth } from '../firebase';
import { AuthenticationService } from '../model/api/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title: string = 'MARKTEC'
  selectedRoute: HTMLElement | undefined
  navSubscription: Subscription
  userSubscription : Subscription

  constructor(private router: Router, private navService: NavService, public authService : AuthenticationService) {
    this.navSubscription = this.navService.showNav$.subscribe(value => this.showNav = value)
    this.userSubscription = this.navService.userData$.subscribe(data => this.currentUser = data)
    /*
    onAuthStateChanged(auth,user => {
      if (user) this.router.navigate(['/dashboard']).then().catch()
    })*/

  }

  ngOnDestroy(): void {
    this.navSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }

  goToRoute(route: string) {
    this.closeSidebar()
    this.router.navigate([route]).then().catch()
  }

  closeSidebar() {
    const close: HTMLButtonElement = document.getElementById('btn-close-sidebar')! as HTMLButtonElement
    close.click()
  }

  setAndRemoveSelectedStyle(id: string) {
    let sidebarItem: HTMLElement = document.getElementById(`${id}-route`)! as HTMLElement
    if (typeof this.selectedRoute !== 'undefined') this.selectedRoute.classList.remove('selected')
    this.selectedRoute = sidebarItem
    this.selectedRoute.classList.add('selected')
  }

  public showNav: boolean = false
  public currentUser: User | null | undefined
  protected readonly signOut = signOut;
  protected readonly auth = auth;
}
