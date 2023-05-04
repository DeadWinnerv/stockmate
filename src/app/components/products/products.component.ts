import { Component } from '@angular/core';
import { PRODUCTS, IProduct } from 'src/app/constants/PRODUCTS';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: IProduct[] = PRODUCTS
  activeTab: 'filter' | 'addNew' = 'addNew'

  handleTabChange(tabName: 'filter' | 'addNew') {
    this.activeTab = tabName
  }
}
