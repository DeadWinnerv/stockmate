import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { StoragesComponent } from './components/storages/storages.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersComponent } from './components/orders/orders.component';
import { ExpensesChartComponent } from './components/dashboard/expenses-chart/expenses-chart.component';
import { OrdersChartComponent } from './components/dashboard/orders-chart/orders-chart.component';
import { StocksChartComponent } from './components/dashboard/stocks-chart/stocks-chart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    DashboardComponent,
    InventoryComponent,
    StoragesComponent,
    ProfileComponent,
    OrdersComponent,
    ExpensesChartComponent,
    OrdersChartComponent,
    StocksChartComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
