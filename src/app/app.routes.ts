import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaleComponent } from './sale/sale.component';
import { CustomersComponent } from './customers/customers.component';
import { DebtsComponent } from './debts/debts.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportsInventoryComponent } from './reports/reports-inventory/reports-inventory.component';
import { ReportsSalesComponent } from './reports/reports-sales/reports-sales.component';

import { EmployeesComponent } from './employees/employees.component';
import { RoutesGuard } from "../model/utils/routes.guard";
import { DetailsDebstComponent } from './debts/details-debst/details-debst.component';
import { InventoryAddComponent } from './inventory/inventory-add/inventory-add.component';
import {InventorySearchComponent} from "./inventory/inventory-search/inventory-search.component";
import {InventoryProductsComponent} from "./inventory/inventory-products/inventory-products.component";
import { CustomersArchivedComponent } from './customers/customers-archived/customers-archived.component';
import { ReportsBoxcutComponent } from './reports/reports-boxcut/reports-boxcut.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RoutesGuard] },
  {
    path: 'inventory', component: InventoryComponent, canActivate: [RoutesGuard],
    children: [
      { path: 'add', component:  InventoryAddComponent },
      { path: 'search/:id', component: InventorySearchComponent },
      { path: 'products', redirectTo: 'products/1' },
      { path: 'products/:page', component: InventoryProductsComponent },
      { path: '', redirectTo: 'inventory', pathMatch: 'full' }
    ]
  },
  { path: 'sale', component: SaleComponent, canActivate: [RoutesGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [RoutesGuard],
    children:[
      {path: 'archived', component: CustomersArchivedComponent},
      {path: '', redirectTo: 'customers', pathMatch: 'full'}
    ] 
  },
  { path: 'debts', component: DebtsComponent, canActivate: [RoutesGuard],
    children:[
      {path: 'details', component: DetailsDebstComponent},
      {path: '',  redirectTo: 'debts', pathMatch: 'full'}
    ]
  },
  { path: 'reports', component: ReportsComponent, canActivate: [RoutesGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [RoutesGuard] },
  { path: 'reports-inventory', component: ReportsInventoryComponent, canActivate: [RoutesGuard] },
  { path: 'reports-inventory/:page', component: ReportsInventoryComponent, canActivate: [RoutesGuard] },
  { path: 'reports-sales', component: ReportsSalesComponent, canActivate: [RoutesGuard] },
  { path: 'reports-boxcut', component: ReportsBoxcutComponent, canActivate: [RoutesGuard] },

  { path:'**', redirectTo: 'dashboard', pathMatch: 'full' }
];
