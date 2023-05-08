import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Toast } from '../ui/preloader/Toasts/Toast';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  requestError: any;
  isErrorDisplay: boolean = false;
  constructor(private service: ProductService){

  }
  isLoading: boolean = true;

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
    this.isLoading = true;
    this.service.getProducts().subscribe({
      next: (res: any) => {
        this.products = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false;
      }
    })
  }
  addProduct() {
    this.productForm.disable();
    this.aSub = this.service.addProduct(this.productForm.value).subscribe({
      next: () => {
        this.productForm.enable();
        this.productForm.reset();
        this.loadProducts();
        Toast.fire({
          icon: 'success',
          title: 'Товар успешно добавлен',
        })
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
