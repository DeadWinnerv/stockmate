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
import { IOrderPosition } from 'src/app/models/position';
import { Toast } from '../ui/preloader/Toasts/Toast';

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
  protected isAddingNewOrder = this.isTableEmpty;
  protected storageOptions: string[];
  protected filteredStorageOptions: Observable<string[]>;
  protected storageInput = new FormControl('', Validators.required);
  protected filteredProductOptions: Observable<string[]>;
  protected productsFilter = new FormControl('');
  protected selectedProductsList: IProduct[] = []
  protected selectedPositions: IOrderPosition[] = []
  protected addNewOrderForm: FormGroup;
  private _storages: IStorage[];
  

  @ViewChild(SortTableDirective) sortTableDirective: SortTableDirective;

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.addNewOrderForm = new FormGroup({
      storageName: new FormControl('', Validators.required),
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
          if (!this.selectedProductsList.includes(product))
          {
            this.selectedProductsList.push((product) as any)
            const index = this.selectedProductsList.indexOf(product)
            this.selectedPositions[index] = {
              product,
              count: 0
            }
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

  showValue(e: any) {
    console.log(e.target.value);
    
  }

  addOrder() {
    this.isAddingNewOrder = false;
    this.isLoading = true;
    this.addNewOrderForm.disable();
    console.log(this._storages.find(item => this.storageInput.value === item.name)!._id);
    console.log(this.addNewOrderForm.get('storageName')?.value);
    console.log(this.selectedPositions);
    console.log(this.addNewOrderForm.get('orderPrice')?.value);
    
    this.ordersService.addOrder({
      storageId: this._storages.find(item => this.storageInput.value === item.name)!._id, //temp
      storageName: this.storageInput.value!,
      positions: this.selectedPositions,
      orderPrice: this.addNewOrderForm.get('orderPrice')?.value,
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.isAddingNewOrder = false;
        this.addNewOrderForm.enable()
        this.addNewOrderForm.reset()
        this.selectedPositions = []
        this.selectedProductsList = []
        this.loadOrdersList()
      },
      error: (err) => {
        this.isLoading = false;
        this.isAddingNewOrder = true;
        Toast.fire(err.error.msg)
        console.log(err);
      },
    })
    
  }

  removeSelectedProduct(id: string) {
    this.selectedProductsList = this.selectedProductsList.filter((item) => item._id !== id)
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
