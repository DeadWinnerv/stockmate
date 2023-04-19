import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { StoragesComponent } from './components/storages/storages.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, data: {activeButton: 'dashboard'}},
  {path: 'inventory', component: InventoryComponent, data: {activeButton: 'inventory'}},
  {path: 'storages', component: StoragesComponent, data: {activeButton: 'storages'}},
  {path: 'profile', component: ProfileComponent, data: {activeButton: 'profile'}},
  {path: 'orders', component: OrdersComponent, data: {activeButton: 'orders'}},
  {path: 'login', component: LoginComponent, data: {hideMenu: true}},
  {path: 'register', component: RegisterComponent, data: {hideMenu: true}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
