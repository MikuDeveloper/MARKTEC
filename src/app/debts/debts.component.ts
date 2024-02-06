import { Component, TemplateRef } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})
export class DebtsComponent {
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }
}
