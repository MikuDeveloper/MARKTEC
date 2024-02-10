import { Component } from '@angular/core';
import { NavService } from '../../../model/utils/navbar.util';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-details-debst',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './details-debst.component.html',
  styleUrl: './details-debst.component.scss'
})
export class DetailsDebstComponent {
  constructor(private navService: NavService){
    this.navService.toggleNav(true)
  }
}
