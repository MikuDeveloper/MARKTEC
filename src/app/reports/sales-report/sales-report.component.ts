import { Component } from '@angular/core';
import { NavService } from '../../../model/utils/navbar.util';
import { ReportsComponent } from '../reports.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../../model/entities/product.model';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [ReportsComponent, AsyncPipe, NgForOf, NgIf, FormsModule],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss'
})
export class SalesReportComponent {
  saleReport: Promise<ProductModel[]> | undefined
  
  columnHead: string[] =[
    'ID Venta', 'Fecha', 'Producto', 'Categoría', 'Cédula de Compra', 
    'Artículos recibidos', 'Valor de Producto', 'Valor de Artículos Recibidos', 'Margen de Ganancia', 'Estado de Venta', 'Método de Pago','Clave de Elector', 'Cliente', 'Empleado']

  tablaActual: number = 1; // Inicializamos con la tabla 1

  constructor(private navService: NavService) {
    this.navService.toggleNav(true);
  }
  
  cambiarTabla(tabla: number) {
    this.tablaActual = tabla;
  }

  // Objeto para controlar la visibilidad de las columnas
  columnVisibilitySR: {
    'ID Venta': boolean,
    'Producto': boolean,
    'Fecha': boolean,
    'Categoría': boolean,
    'Cédula de Compra': boolean,
    'Artículos recibidos': boolean,
    'Valor de Producto': boolean,
    'Valor de Artículos Recibidos': boolean,
    'Margen de Ganancia': boolean,
    'Estado de Venta': boolean,
    'Método de Pago': boolean,
    'Clave de Elector': boolean,
    'Cliente': boolean,
    'Empleado': boolean,
    [key: string]: boolean;  // Firma de índice
  } = {
    'ID Venta': true,
    'Producto': true,
    'Fecha': true,
    'Categoría': true,
    'Cédula de Compra': true,
    'Artículos recibidos': false,
    'Valor de Producto': false,
    'Valor de Artículos Recibidos': false,
    'Margen de Ganancia': false,
    'Estado de Venta': false,
    'Método de Pago': false,
    'Clave de Elector': false,
    'Cliente': false,
    'Empleado': false
  };

  //función que permite la visibilidad de la columna con valor boolean
  toggleCheckbox(column: string): void {
    this.columnVisibilitySR[column] = !this.columnVisibilitySR[column];
  }
  //función que evita que el dropdown se cierre
  toggleDropdown(event: Event): void {
    event.stopPropagation()
  }
}
