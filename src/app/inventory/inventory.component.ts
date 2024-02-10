import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { AfterViewInit, Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";
import { ElementsService } from '../../model/utils/elements.service';
import { BehaviorSubject } from 'rxjs';


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

  searchProduct(search: any) {
    console.log(search['search_inventory'])
    console.log(search['filter_inventory'])
  }
  ngAfterViewInit(): void {
    this.elementsService.initializeTooltips()
    this.elementsService.initializePopovers()
  }
  getDetails(): string {
    // Por ejemplo, si tienes una variable `observations` o función `getStatus()`
    let details=`
    Observaciones: ${this.observations}
    <br> Estado de batería: ${this.observations}
    <br> Estado físico:`;
    return details
   }

   getOthers(): string {
    // Por ejemplo, si tienes una variable `observations` o función `getStatus()`
    let other=`
    Fecha: ${this.observations}
    <br> Operador: ${this.observations}`;
    return other
   }
}
