import {Component, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User, signOut } from 'firebase/auth'
import { auth } from '../firebase';
import { NavService } from "../model/utils/navbar.util";
import { Subscription } from "rxjs";
import {SessionService} from "../model/utils/session.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title: string = 'MARKTEC'
  showNav: boolean = false
  currentUser: User | null | undefined
  navSubscription: Subscription
  userSubscription: Subscription

  constructor(private router: Router, private navService: NavService, private authentication: SessionService) {
    this.navSubscription = this.navService.showNav$.subscribe(value => this.showNav = value)
    this.userSubscription = this.authentication.getUser$().subscribe(user => this.currentUser = user)
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

  async closeSession() {
    await signOut(auth)
  }
}
