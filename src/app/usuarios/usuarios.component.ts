import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Objecto } from '../firestore-interface';
import {AsyncPipe,NgForOf} from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [AsyncPipe,NgForOf],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
  employees : Promise<Objecto[]> | undefined
  constructor(private databaseService : FirestoreService){
    this.employees = this.databaseService.getCollectionData("employees")
  }
}
