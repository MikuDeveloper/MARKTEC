import { Component, TemplateRef } from '@angular/core';
import {NavService} from "../../model/utils/navbar.util";
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    NgClass,
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})
export class DebtsComponent {
  defaultDate: string;
  defaultTime: string;
  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
    const currentDate = new Date();
    this.defaultDate = currentDate.toISOString().substring(0, 10); // Formato 'YYYY-MM-DD'
    this.defaultTime = this.formatTime(currentDate); // Formato 'HH:MM'
  }
  private formatTime(date: Date): string {
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    // Asegurarse de que los minutos tengan dos dígitos
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }

    return hours + ':' + minutes;
  }
}
