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
import {InventoryAddComponent} from "./inventory/inventory-add/inventory-add.component";
import {InventorySearchComponent} from "./inventory/inventory-search/inventory-search.component";
import {InventoryProductsComponent} from "./inventory/inventory-products/inventory-products.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RoutesGuard] },
  {
    path: 'inventory', component: InventoryComponent, canActivate: [RoutesGuard],
    children: [
      { path: 'add', component:  InventoryAddComponent },
      { path: 'search/:id', component: InventorySearchComponent },
      { path: 'products/:page', component: InventoryProductsComponent },
      { path: '', redirectTo: 'inventory', pathMatch: 'full' }
    ]
  },
  { path: 'sale', component: SaleComponent, canActivate: [RoutesGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [RoutesGuard] },
  { path: 'debts', component: DebtsComponent, canActivate: [RoutesGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [RoutesGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [RoutesGuard] },

  { path:'**', redirectTo: 'dashboard', pathMatch: 'full' }
];
