import { AsyncPipe, NgForOf, NgIf, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportsComponent } from '../reports.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../../model/api/firestore.service';
import { ProductModel } from '../../../model/entities/product.model';
import { NavService } from '../../../model/utils/navbar.util';

@Component({
  selector: 'app-reports-inventory',
  standalone: true,
  imports: [
    ReportsComponent, 
    AsyncPipe, 
    NgForOf, 
    NgIf, 
    FormsModule, 
    CommonModule
  ],
  templateUrl: './reports-inventory.component.html',
  styleUrl: './reports-inventory.component.scss'
})
export class ReportsInventoryComponent {
  itemsReport: ProductModel[]=[]
  // Propiedad para la opción seleccionada en el primer select
  selectedFilter: string ='' 
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private navService: NavService, private databaseService: FirestoreService, private route: ActivatedRoute,
    private router: Router) {
    this.navService.toggleNav(true);
    //this.itemsReport = this.databaseService.getCollectionDataTest("inventory")
    this.route.params.subscribe(params => { //suscribe a los cambios en los parámetros de la ruta
      this.currentPage = +params['page'] || 1;//Accede a los parámetros de la ruta utilizando el objeto params
      this.loadItems();
    });
  }

  async loadItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  const allItems = await this.databaseService.getCollectionDataTest("inventory");
  this.itemsReport = allItems.slice(start, end);
  }
  
  //contiene un mapeo de las opciones según la opción seleccionada en el primer select
  dataOptions: { [key: string]: string[] } = {
    'brand': ['Samsung', 'Apple', 'Xiomi'],
    'category': ['Celular', 'Auriculares', 'Laptop', 'Bocina'],
    'storage': ['8GB', '16GB', '32GB', '64GB'],
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
      case 'storage':
       return 'Almacenamiento';
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
  // Encabezado de la tabla
  columnHead: string[] = ['Fecha', 'Hora', 'Modelo', 'IMEI','Precio','Categoría', 'Id', 'Marca', 'Color','Almacenamiento', 'Estado Físico', 'Estado de Batería', 'Observaciones', 'Ubicación','Empleado']

  // Objeto para controlar la visibilidad de las columnas
  columnVisibility: {
    'Fecha': boolean,
    'Hora': boolean,
    'IMEI': boolean,
    'Precio': boolean,
    'Modelo': boolean,
    'Categoría': boolean,
    'Id': boolean,
    'Marca': boolean,
    'Color': boolean,
    'Almacenamiento': boolean,
    'Estado Físico': boolean,
    'Estado de Batería': boolean,
    'Observaciones': boolean,
    'Ubicación': boolean,
    'Empleado': boolean,
    [key: string]: boolean;  // Firma de índice
  } = {
    'Fecha': true,
    'Hora': false,
    'IMEI': true,
    'Precio': true,
    'Modelo': true,
    'Categoría': true,
    'Id': false,
    'Marca': false,
    'Color': false,
    'Almacenamiento': false,
    'Estado Físico': false,
    'Estado de Batería': false,
    'Observaciones': false,
    'Ubicación': false,
    'Empleado': false
  };
  //función que permite la visibilidad de la columna con valor boolean
  toggleCheckbox(column: string): void {
    this.columnVisibility[column] = !this.columnVisibility[column];
  }
  //función que evita que el dropdown se cierre
  toggleDropdown(event: Event): void {
    event.stopPropagation()
  }
  
  changePage(newPage: number) {
    // Verifica que newPage sea un número positivo, menor o igual al total de páginas
    // y diferente de la página actual para evitar una navegación innecesaria
    if (newPage > 0 && newPage <= this.getTotalPages() && newPage !== this.currentPage) {
      // Actualiza la URL con el nuevo número de página
      this.router.navigate(['/inventory-report', newPage]);
    }
  }
  
  getPages() {
    const totalPages = this.getTotalPages(); // Obtiene el total de páginas
  const visiblePages = 5;
  const start = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));// Calcula el índice de la primera página visible.

  return Array.from({ length: Math.min(visiblePages, totalPages) }, (_, index) => start + index); //Utiliza Array.from para generar un array de la longitud especificada.
  }
  
  getTotalPages() {
    const totalItems = this.itemsReport?.length || 0; // Obtener el número total de elementos en el array (si existe)
    return Math.max(Math.ceil(totalItems / this.itemsPerPage), 1); //Calcular el número total de páginas dividiendo el número total de elementos por la cantidad de elementos por página
  } 
}
