import { Component } from '@angular/core';
import { NavService } from '../../../model/utils/navbar.util';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-debst',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink, 
    RouterLinkActive, 
    RouterOutlet],
  templateUrl: './details-debst.component.html',
  styleUrl: './details-debst.component.scss'
})
export class DetailsDebstComponent {
  constructor(private navService: NavService){
    this.navService.toggleNav(true)
  }
  
}
