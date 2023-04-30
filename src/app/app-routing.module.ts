import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { StoragesComponent } from './components/storages/storages.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './classes/auth.guard';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { activeButton: 'dashboard' },
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AuthGuard],
    data: { activeButton: 'inventory' },
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    data: { activeButton: 'products' },
  },
  {
    path: 'storages',
    component: StoragesComponent,
    canActivate: [AuthGuard],
    data: { activeButton: 'storages' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { activeButton: 'profile' },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
    data: { activeButton: 'orders' },
  },
  { path: 'login', component: LoginComponent, data: { shownMenu: true } },
  { path: 'register', component: RegisterComponent, data: { shownMenu: true } },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    data: { activeButton: 'dashboard' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
