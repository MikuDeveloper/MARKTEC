import { AfterViewInit, Component } from '@angular/core';
import { NavService } from '../../../model/utils/navbar.util';
import { ReportsComponent } from "../reports.component";
import { ElementsService } from '../../../model/utils/elements.service';

@Component({
    selector: 'app-reports-boxcut',
    standalone: true,
    templateUrl: './reports-boxcut.component.html',
    styleUrl: './reports-boxcut.component.scss',
    imports: [ReportsComponent]
})
export class ReportsBoxcutComponent implements AfterViewInit{
  constructor(private navService: NavService, private elementsSerivce: ElementsService) {
    this.navService.toggleNav(true);
  }

  ngAfterViewInit(): void {
      this.elementsSerivce.initializeTooltips();
  }


}
