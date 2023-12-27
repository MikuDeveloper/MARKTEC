import { Routes } from '@angular/router';
import {InventoryComponent} from "./inventory/inventory.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  { path : 'inventory', component:InventoryComponent }
];
