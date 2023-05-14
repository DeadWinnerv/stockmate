import { Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import { IInventory } from 'src/app/models/inventory';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { IStorage } from 'src/app/models/storage';
import { IProduct } from 'src/app/models/product';
import { InventoryService } from 'src/app/services/inventory.service';
import { StorageService } from 'src/app/services/storage.service';
import { ProductService } from 'src/app/services/product.service';
import { Toast } from '../ui/preloader/Toasts/Toast';
import { SortTableDirective } from 'src/directives/sortTable.directive';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  requestError: any;
  isErrorDisplay: boolean = false;
  isLoading: boolean = true;
  INVENTORY: IInventory[] = [];
  storages: IStorage[];
  products: IProduct[];
  protected inventoryForm: FormGroup;
  protected shownColumn: number | 'total' | '';
  protected displayedColumns: string[] = [];
  protected sortingColumn: {
    column: number | 'total' | '',
    direction?: 'asc' | 'desc'
  } = {
    column: ''
  }
  protected chooseStorageForm = new FormControl('', [Validators.required]);
  protected chooseProductForm = new FormControl('', [Validators.required]);
  protected storageOptions: string[];
  protected productOptions: string[];
  protected filteredStorageOptions: Observable<string[]>;
  protected filteredProductOptions: Observable<string[]>;
  protected toolBarActiveTab: 'filter' | 'add' = 'filter';

  @ViewChild(SortTableDirective) sortTableDirective: SortTableDirective
  
  constructor(
    private InventoryService: InventoryService,
    private StorageService: StorageService,
    private ProductService: ProductService,
  ) {}

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
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
    this.InventoryService.getInventory().subscribe({
      next: (res) => {
        this.INVENTORY = res
        this.displayedColumns = [...Object.keys(this.INVENTORY[0]).filter(
            (item) =>
              !['id', 'createdby', '__v'].some((column) =>
                item.toLowerCase().includes(column)
              )
          ),
        ];
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
        });
      },
      error: (error) => {
        this.isErrorDisplay = true;
        this.requestError = error.error.msg;
        console.warn(error);
        this.inventoryForm.enable();
      },
    });
  }

  changeTab(tabName: 'filter' | 'add'): void {
    this.toolBarActiveTab = tabName;
  }

  handleTableHeaderHover(i: number | 'total' | '') {
    this.shownColumn = i
  }

  handleSortDirection(i: number) {
    if(this.sortingColumn.column !== i) {
      this.sortingColumn.column = i;
      this.sortingColumn.direction = undefined
    } 
    if (!this.sortingColumn.direction) {
      this.sortingColumn.direction = 'asc'
      this.INVENTORY = this.sortTableDirective.getSortedTable()
    } else if (this.sortingColumn.direction === 'asc') {
      this.sortingColumn.direction = 'desc'
      this.INVENTORY = this.sortTableDirective.getSortedTable()
    } else {
      this.shownColumn = ''
      this.sortingColumn.column = ''
      this.sortingColumn.direction = undefined
    }
  }
}
