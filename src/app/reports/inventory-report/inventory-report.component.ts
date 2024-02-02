import { Component } from '@angular/core';
import { NavService } from '../../../model/utils/navbar.util';
import { ReportsComponent } from '../reports.component';
import { FirestoreService } from '../../../model/api/firestore.service';
import { ProductModel } from '../../../model/entities/product.model';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-report',
  standalone: true,
  imports: [ReportsComponent, AsyncPipe, NgForOf, NgIf, FormsModule],
  templateUrl: './inventory-report.component.html',
  styleUrl: './inventory-report.component.scss'
})
export class InventoryReportComponent {
  itemsReport: Promise<ProductModel[]> | undefined
  // Encabezado de la tabla
  columnHead: string[] = ['Fecha', 'IMEI', 'Marca', 'Categoría', 'Operador', 'Precio', 'Color','GB', 'Estado Físico', 'Estado de Batería', 'Hora', 'Ubicación']
  // Propiedad para la opción seleccionada en el primer select
  selectedFilter: string ='' 

  constructor(private navService: NavService, private databaseService: FirestoreService) {
    this.navService.toggleNav(true);
    this.itemsReport = this.databaseService.getCollectionDataTest("inventarioTest")
    console.log(this.itemsReport)
  }  
  //contiene un mapeo de las opciones según la opción seleccionada en el primer select
  dataOptions: { [key: string]: string[] } = {
    'brand': ['Samsung', 'Apple', 'Xiomi'],
    'category': ['Celular', 'Auriculares', 'Laptop', 'Bocina'],
    'color': ['Rojo', 'Azul', 'Verde', 'Negro'],
    'gb': ['8GB', '16GB', '32GB', '64GB'],
    'estadoFisico': ['Nuevo', 'Usado', 'Reacondicionado'],
    'operador': ['Movistar', 'Claro', 'Entel', 'Bitel'],
    'estadoBateria': ['Buena', 'Regular', 'Mala']
  };

  //funcion que devuelve las opciones del filtro seleccinado 
  getFilteredOptions(): string[] {
    return this.dataOptions[this.selectedFilter] || [];
  }
  //Etiqueta del filtro seleccionado
  getFilterLabel(): string {
    switch (this.selectedFilter) {
      case 'brand':
        return 'Marca';
      case 'category':
        return 'Categoría';
      case 'color':
        return 'Color';
      case 'gb':
       return 'GB';
      case 'estadoFisico':
       return 'Estado Físico';
      case 'operador':
       return 'Operador';
      case 'estadoBateria':
        return 'Estado de Batería';  
      default:
        return '';
    }
  }

  // Objeto para controlar la visibilidad de las columnas
  columnVisibility: {
    'IMEI': boolean,
    Marca: boolean,
    'Categoría': boolean,
    Operador: boolean,
    Fecha: boolean,
    Precio: boolean,
    Color: boolean,
    'GB': boolean,
    'Estado Físico': boolean,
    'Estado de Batería': boolean,
    Hora: boolean,
    Ubicacion: boolean,
    [key: string]: boolean;  // Firma de índice
  } = {
    'IMEI': true,
    Marca: true,
    'Categoría': true,
    Operador: true,
    Fecha: true,
    Precio: false,
    Color: false,
    'GB': false,
    'Estado Físico': false,
    'Estado de Batería': false,
    Hora: false,
    Ubicacion: false,
  };
  //función que permite la visibilidad de la columna con valor boolean
  toggleCheckbox(column: string): void {
    this.columnVisibility[column] = !this.columnVisibility[column];
  }
  //función que evita que el dropdown se cierre
  toggleDropdown(event: Event): void {
    event.stopPropagation()
  }

}
