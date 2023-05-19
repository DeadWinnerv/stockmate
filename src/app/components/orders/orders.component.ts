import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { SortTableDirective } from 'src/directives/sortTable.directive';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/product';
import { StorageService } from 'src/app/services/storage.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IStorage } from 'src/app/models/storage';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  ordersList: IOrder[];
  protected activeFilter:
    | 'created'
    | 'paid'
    | 'delievering'
    | 'acceptence'
    | 'completed' = 'created';
  protected displayedColumns: string[] = [];
  protected sortingColumn: {
    column: number | 'total' | '';
    direction?: 'asc' | 'desc';
  } = {
    column: '',
  };
  protected shownColumn: number | 'total' | '';
  protected shownDetails: number | undefined;
  protected isTableEmpty = false;
  protected productsList: IProduct[] = [];
  protected isAddingNewOrder = this.productsList[0] ? false : true;
  protected storageOptions: string[];
  protected filteredStorageOptions: Observable<string[]>;
  protected storageInput = new FormControl('', Validators.required);
  protected filteredProductOptions: Observable<string[]>;
  protected productsFilter = new FormControl('');
  protected selectedProducts: IProduct[] = []
  protected addNewOrderForm: FormGroup;
  protected positionCountInput = new FormControl('', Validators.required)
  private _storages: IStorage[];
  

  @ViewChild(SortTableDirective) sortTableDirective: SortTableDirective;

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.addNewOrderForm = new FormGroup({
      storageId: new FormControl('', Validators.required),
      orderPrice: new FormControl('', Validators.required),
      positions: new FormControl(''),
    });
    this.loadProductsList();
    this.loadOrdersList();
    this.loadStorages();
    this.filteredStorageOptions = this.storageInput.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = value
        return name && name !== ''
          ? this._filterOptions(name as string, this.storageOptions)
          : this.storageOptions;
      })
    );
    this.filteredProductOptions = this.productsFilter.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = value;
        const product = this.productsList.find((item) => item.name === name) ?? null
        if (product) {
          if (!this.selectedProducts.includes(product))
          {
            this.selectedProducts.push((product) as any)
            this.productsFilter.reset()
            return this.productsList.map(item => item.name)
          }
        }
        return name && name !== ''
          ? this._filterOptions(
              name as string,
              this.productsList.map((item) => item.name)
            )
          : this.productsList.map((item) => item.name);
      })
    );
  }

  ngOnDestroy(): void {}

  loadOrdersList() {
    this.isLoading = true;
    this.ordersService.getOrdersList().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.ordersList = [...res];
          console.log(res);
          this.displayedColumns = [
            ...Object.keys(res[0]).filter(
              (item) =>
                !['id', 'createdby', '__v'].some((column) =>
                  item.toLowerCase().includes(column)
                )
            ),
          ];
        } else {
          this.isTableEmpty = true;
        }
        this.isLoading = false;
      },
      error: (err) => console.error(err),
    });
  }

  addOrder() {
    this.isAddingNewOrder = false;
    this.isLoading = true;
    this.addNewOrderForm.disable();
    this.addNewOrderForm.value.storageId = this._storages.find((item) => {
      item.name === this.storageInput.value;
    })?._id;
    console.log(this.positionCountInput.value);
    
  }

  removeSelectedProduct(id: string) {
    this.selectedProducts = this.selectedProducts.filter((item) => item._id !== id)
  }

  loadProductsList() {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.productsList = res;
        this.filteredProductOptions.subscribe;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  loadStorages() {
    this.storageService.getStorages().subscribe({
      next: (res) => {
        this._storages = res;
        this.storageOptions = res.map((storage) => storage.name);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  handleTableHeaderHover(i: number | 'total' | '') {
    this.shownColumn = i;
  }

  handleSortDirection(i: number) {
    if (this.sortingColumn.column !== i) {
      this.sortingColumn.column = i;
      this.sortingColumn.direction = undefined;
    }
    if (!this.sortingColumn.direction) {
      this.sortingColumn.direction = 'asc';
      this.ordersList = this.sortTableDirective.getSortedTable();
    } else if (this.sortingColumn.direction === 'asc') {
      this.sortingColumn.direction = 'desc';
      this.ordersList = this.sortTableDirective.getSortedTable();
    } else {
      this.shownColumn = '';
      this.sortingColumn.column = '';
      this.sortingColumn.direction = undefined;
    }
  }

  showDetails(i: number) {
    this.shownDetails === i
      ? (this.shownDetails = undefined)
      : (this.shownDetails = i);
  }

  private _filterOptions(name: string, options: string[]) {
    const filterValue = name.toLowerCase();
    return options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
