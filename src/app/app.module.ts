import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgChartsModule } from 'ng2-charts'
import { QRCodeModule } from 'angularx-qrcode';
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
import { TokenInterceptor } from './services/token-interceptor.service';
import { PreloaderComponent } from './components/ui/preloader/preloader.component';
import { RetryInterceptor } from './interceptors/retry.interceptor';
import { ProductsComponent } from './components/products/products.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { PageHeaderDirective } from 'src/directives/pageHeader.directive';
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
    RegisterComponent,
    PreloaderComponent,
    ProductsComponent,
    PageHeaderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatAutocompleteModule,
    SweetAlert2Module.forRoot({
      provideSwal: Swal
    }),
    NgChartsModule,
    QRCodeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
