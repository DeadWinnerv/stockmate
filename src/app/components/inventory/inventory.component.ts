import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IInventory } from 'src/app/models/inventory';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { IStorage } from 'src/app/models/storage';
import { IProduct } from 'src/app/models/product';
import { InventoryService } from 'src/app/services/inventory.service';
import { StorageService } from 'src/app/services/storage.service';
import { ProductService } from 'src/app/services/product.service';
import { Toast } from '../ui/preloader/Toasts/Toast';

type TColumnName = 'id' | 'name' | 'storage' | 'price' | 'stock' | '';

type TSortingColumn = {
  column?: TColumnName;
  direction?: 'asc' | 'desc';
};

type TShownColumn = 'id' | 'name' | 'storage' | 'price' | 'stock' | '';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements AfterViewInit, OnInit {
  public displayedColumns: string[] = [
    'id',
    'name',
    'storage',
    'price',
    'stock',
  ];
  requestError: any;
  isErrorDisplay: boolean = false;

  isLoading: boolean = true;
  INVENTORY: IInventory[] = [];
  storages: IStorage[];
  products: IProduct[];
  inventoryForm: FormGroup;
  public dataSource: any;
  private sortedTable: IInventory[];
  private filteredTable: IInventory[];
  public storageFilter = 'all';
  public sortingColumn: TSortingColumn = {};
  public shownColumn: string = '';
  protected chooseStorageForm = new FormControl('', [Validators.required]);
  protected chooseProductForm = new FormControl('', [Validators.required]);
  protected storageOptions: string[];
  protected productOptions: string[];
  protected filteredStorageOptions: Observable<string[]>;
  protected filteredProductOptions: Observable<string[]>;
  protected toolBarActiveTab: 'filter' | 'add' = 'filter';
  constructor(private InventoryService: InventoryService, private StorageService: StorageService, private ProductService: ProductService) {}

  ngOnInit(): void {
    this.inventoryForm = new FormGroup({
      productId: new FormControl('', [Validators.required]),
      storageId: new FormControl('', [Validators.required]),
      stock: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
    });
    this.loadInventory();
  }
  loadInventory() {
    this.isLoading = true;
    this.StorageService.getStorages().subscribe({
      next: (storages) => {
        this.storages = storages;
        this.storageOptions = this.storages.map((item) => item.name);
        this.filteredStorageOptions = this.chooseStorageForm.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterStorages(value || ''))
        );
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
    this.ProductService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.productOptions = this.products.map((item) => item.name);
        this.filteredProductOptions = this.chooseProductForm.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterProducts(value || ''))
        );
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
    this.InventoryService.getInventory().subscribe({
      next: (res) => {
        this.INVENTORY = res;
        this.dataSource = new MatTableDataSource<IInventory>(this.INVENTORY);
        this.sortedTable = [...this.INVENTORY];
        this.filteredTable = [...this.INVENTORY];
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  addInventory() {
    this.inventoryForm.disable();
    this.inventoryForm.value.storageId = this.storages.find(
      (item) => item.name == this.chooseStorageForm.value
    )?._id;
    this.inventoryForm.value.productId = this.products.find(
      (item) => item.name == this.chooseProductForm.value
    )?._id;

    this.InventoryService.addInventory(this.inventoryForm.value).subscribe({
      next: () => {
        this.inventoryForm.reset();
        this.chooseProductForm.reset();
        this.chooseStorageForm.reset();
        this.inventoryForm.enable();
        this.loadInventory();
        Toast.fire({
          icon: 'success',
          title: 'Товар успешно проведён',
        })
      },
      error: (error) => {
        this.isErrorDisplay = true;
        this.requestError = error.error.msg;
        console.warn(error);
        this.inventoryForm.enable();
      },
    });
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private _filterStorages(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.storageOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  private _filterProducts(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  changeTab(tabName: 'filter' | 'add'): void {
    this.toolBarActiveTab = tabName;
  }

  handleStorageFilterChange(): void {
    this.sortingColumn = {};
    this.filteredTable = [...this.INVENTORY];
    this.filteredTable = this.filteredTable.filter((item) =>
      this.storageFilter !== 'all'
        ? item.storageName === this.storageFilter
        : true
    );
    this.dataSource = new MatTableDataSource<IInventory>(this.filteredTable);
    this.dataSource.paginator = this.paginator;
  }

  private sortData(columnName: TColumnName): void {
    this.sortedTable = [...this.filteredTable];
    const compareFn = (a: IInventory, b: IInventory): number => {
      const direction = this.sortingColumn.direction === 'asc' ? 1 : -1;
      switch (columnName) {
        // case 'id':
        // return direction * (a._id - b._id);
        case 'name':
          return direction * a.productName.localeCompare(b.productName);
        case 'price':
          return direction * (a.productPrice - b.productPrice);
        case 'stock':
          return direction * (a.stock - b.stock);
        default:
          return 0;
      }
    };

    !this.sortingColumn.direction
      ? (this.sortedTable = [...this.filteredTable])
      : this.sortedTable.sort(compareFn);

    this.dataSource = new MatTableDataSource<IInventory>(this.sortedTable);
    this.dataSource.paginator = this.paginator;
  }

  handleSortChange(columnName: TColumnName): void {
    if (this.sortingColumn.column !== columnName) {
      this.sortingColumn = { column: columnName, direction: 'desc' };
    } else if (this.sortingColumn.direction === 'desc') {
      this.sortingColumn.direction = 'asc';
    } else {
      this.sortingColumn = {};
    }
    this.sortData(columnName);
  }
}
