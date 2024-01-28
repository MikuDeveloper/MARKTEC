import { Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent implements AfterViewInit{
  observations: string = "Ya quedo jsjs s +s s s s s s s"
  constructor(private navService: NavService, private elementsService: ElementsService) {
    this.navService.toggleNav(true);
  }
}
