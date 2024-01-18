import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaleComponent } from './sale/sale.component';
import { CustomersComponent } from './customers/customers.component';
import { DebtsComponent } from './debts/debts.component';
import { ReportsComponent } from './reports/reports.component';
import { EmployeesComponent } from './employees/employees.component';
import { AuthGuard } from '../model/utils/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'sale', component: SaleComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'debts', component: DebtsComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },

];