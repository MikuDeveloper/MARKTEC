import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaleComponent } from './sale/sale.component';
import { CustomersComponent } from './customers/customers.component';
import { DebtsComponent } from './debts/debts.component';
import { ReportsComponent } from './reports/reports.component';
import { EmployeesComponent } from './employees/employees.component';
import { loginGuard } from '../model/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [loginGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [loginGuard] },
  { path: 'sale', component: SaleComponent, canActivate: [loginGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [loginGuard] },
  { path: 'debts', component: DebtsComponent, canActivate: [loginGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [loginGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [loginGuard] },

];
