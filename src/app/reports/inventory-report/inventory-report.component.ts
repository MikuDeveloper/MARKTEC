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
  columnHead: string[] = ['Fecha', 'IMEI', 'Modelo', 'Categoría', 'Operador', 'Precio', 'Color','GB', 'Estado Fisico', 'Estado de Batería', 'Hora', 'Ubicación']
  // Propiedad para la opción seleccionada en el primer select
  selectedFilter: string ='' 

  constructor(private navService: NavService, private databaseService: FirestoreService) {
    this.navService.toggleNav(true);
    this.itemsReport = this.databaseService.getCollectionDataTest("inventarioTest")
    console.log(this.itemsReport)
  }  
  //contiene un mapeo de las opciones según la opción seleccionada en el primer select
  dataOptions: { [key: string]: string[] } = {
    'model': ['G15', 'M24', 'TOYA32', 'M25'],
    'category': ['Celular', 'Auriculares', 'Laptop', 'Bocina'],
    'color': ['Rojo', 'Azul', 'Verde', 'Negro'],
    'gb': ['8GB', '16GB', '32GB', '64GB'],
    'estadoFisico': ['Nuevo', 'Usado', 'Reacondicionado'],
    'operador': ['Movistar', 'Claro', 'Entel', 'Bitel'],
    'estadoBateria': ['Buena', 'Regular', 'Mala']
  };

  getFilteredOptions(): string[] {
    return this.dataOptions[this.selectedFilter] || [];
  }

  getFilterLabel(): string {
    switch (this.selectedFilter) {
      case 'model':
        return 'Modelo';
      case 'category':
        return 'Categoría';
      case 'color':
        return 'Color';
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
    Modelo: boolean,
    'Categoría': boolean,
    Operador: boolean,
    Fecha: boolean,
    Precio: boolean,
    Color: boolean,
    'GB': boolean,
    EstadoFisico: boolean,
    'Estado de Batería': boolean,
    Hora: boolean,
    Ubicacion: boolean,
    [key: string]: boolean;  // Firma de índice
  } = {
    'IMEI': true,
    Modelo: true,
    'Categoría': true,
    Operador: true,
    Fecha: true,
    Precio: false,
    Color: false,
    'GB': false,
    EstadoFisico: false,
    'Estado de Batería': false,
    Hora: false,
    Ubicacion: false,
  };

  toggleCheckbox(column: string): void {
    this.columnVisibility[column] = !this.columnVisibility[column];
  }
  toggleDropdown(event: Event): void {
    event.stopPropagation()
  }

}
