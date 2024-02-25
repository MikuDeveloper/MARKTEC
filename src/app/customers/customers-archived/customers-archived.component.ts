import { Component } from '@angular/core';
import { NavService } from '../../../model/utils/navbar.util';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customers-archived',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './customers-archived.component.html',
  styleUrl: './customers-archived.component.scss'
})
export class CustomersArchivedComponent {
  
}
