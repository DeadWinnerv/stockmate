import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Toast } from '../ui/preloader/Toasts/Toast';
import { SortTableDirective } from 'src/directives/sortTable.directive';

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
  protected displayedColumns: string[] = [];
  protected sortingColumn: {
    column: number | '',
    direction?: 'asc' | 'desc'
  } = {
    column: ''
  };
  protected shownColumn: number | '';

  @ViewChild(SortTableDirective) sortTableDirective: SortTableDirective

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
        this.displayedColumns = [...Object.keys(this.products[0]).filter(
          (item) =>
            !['id', 'createdby', '__v'].some((column) =>
              item.toLowerCase().includes(column)
            )
        ),
      ];
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

  handleTableHeaderHover(i: number | '') {
    this.shownColumn = i
  }

  handleSortDirection(i: number) {
    if(this.sortingColumn.column !== i) {
      this.sortingColumn.column = i;
      this.sortingColumn.direction = undefined
    } 
    if (!this.sortingColumn.direction) {
      this.sortingColumn.direction = 'asc'
      this.products = this.sortTableDirective.getSortedTable()
    } else if (this.sortingColumn.direction === 'asc') {
      this.sortingColumn.direction = 'desc'
      this.products = this.sortTableDirective.getSortedTable()
    } else {
      this.shownColumn = ''
      this.sortingColumn.column = ''
      this.sortingColumn.direction = undefined
    }
  }
}
