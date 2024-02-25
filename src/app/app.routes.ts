import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaleComponent } from './sale/sale.component';
import { CustomersComponent } from './customers/customers.component';
import { DebtsComponent } from './debts/debts.component';
import { ReportsComponent } from './reports/reports.component';
import { EmployeesComponent } from './employees/employees.component';
import { RoutesGuard } from "../model/utils/routes.guard";
import { InventoryReportComponent } from './reports/inventory-report/inventory-report.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';
import { DetailsDebstComponent } from './debts/details-debst/details-debst.component';
import { InventoryAddComponent } from './inventory/inventory-add/inventory-add.component';
import {InventorySearchComponent} from "./inventory/inventory-search/inventory-search.component";
import {InventoryProductsComponent} from "./inventory/inventory-products/inventory-products.component";
import { CustomersArchivedComponent } from './customers/customers-archived/customers-archived.component';
import { EmployeesRegisterComponent } from './employees/employees-register/employees-register.component';
import {InventoryDetailsComponent} from "./inventory/inventory-details/inventory-details.component";

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
      { path: 'products/details', redirectTo: 'products/1' },
      { path: 'products/:page', component: InventoryProductsComponent },
      { path: 'products/details/:imei', component: InventoryDetailsComponent },
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
      {path: 'details/:idDebt', component: DetailsDebstComponent},
      {path: '',  redirectTo: 'debts', pathMatch: 'full'}
    ]
  },
  { path: 'reports', component: ReportsComponent, canActivate: [RoutesGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [RoutesGuard] },
  { path: 'reports-inventory', component: InventoryReportComponent, canActivate: [RoutesGuard] },
  { path: 'reports-inventory/:page', component: InventoryReportComponent, canActivate: [RoutesGuard] },
  { path: 'reports-sales', component: SalesReportComponent, canActivate: [RoutesGuard] },
  {
    path: 'employees', component: EmployeesComponent, canActivate: [RoutesGuard] ,
    children: [
      { path: 'register', component: EmployeesRegisterComponent },
      { path: '', redirectTo: 'employees', pathMatch: 'full' }
    ]
  },

  { path:'**', redirectTo: 'dashboard', pathMatch: 'full' }
];
