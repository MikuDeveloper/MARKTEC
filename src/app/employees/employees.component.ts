import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";
import {createUserWithEmailAndPassword, signInWithCredential, signOut, User} from "firebase/auth";
import {auth} from "../../firebase";
import {SessionService} from "../../model/utils/session.service";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  user : string | undefined | null
  current: User | null | undefined
  constructor(private navService: NavService, private session: SessionService) {
    this.navService.toggleNav(true);
    this.session.getUser$().subscribe((value) => {this.current = value})
  }

  async create() {
    let userOriginal = this.current
    await createUserWithEmailAndPassword(auth, 'j@gmail.com', '123456')
      .then(async (cr) => {
        await signOut(auth)
        // @ts-ignore
        await auth.updateCurrentUser(userOriginal)
      })
      .finally(() => {
        this.user = auth.currentUser?.email
      })
  }
}
