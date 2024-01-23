import { AfterViewInit, Component } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";
import { ElementsService } from '../../model/utils/elements.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent implements AfterViewInit{
  observations: string = "Ya quedo jsjs s +s s s s s s s"
  constructor(private navService: NavService, private elementsService: ElementsService) {
    this.navService.toggleNav(true);
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
