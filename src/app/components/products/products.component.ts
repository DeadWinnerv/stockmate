import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PRODUCTS } from 'src/app/constants/PRODUCTS';
import { IProduct } from 'src/app/models/product';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  requestError: any;
  isErrorDisplay: boolean = false;
  constructor(private service: MainService){

  }
  products: IProduct[] = [];
  aSub: Subscription;
  productForm: FormGroup;
  activeTab: 'filter' | 'addNew' = 'addNew'

  ngOnInit(): void{
    this.loadProducts();
    this.productForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[а-яa-z ,.'-{1,20}$]+$/i),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
    });
  }
  handleTabChange(tabName: 'filter' | 'addNew') {
    this.activeTab = tabName
  }
  loadProducts() {
    this.service.getProducts().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  addProduct() {
    this.productForm.disable();
    console.log(this.productForm.value);
    this.aSub = this.service.addProduct(this.productForm.value).subscribe({
      next: () => {
        this.productForm.enable();
        this.loadProducts();
      },
      error: (error) => {
        this.isErrorDisplay = true;
        this.requestError = error.error.msg;
          console.warn(error);
          this.productForm.enable();
      },
    });
  }

}
