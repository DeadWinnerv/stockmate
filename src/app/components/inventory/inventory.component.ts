import { Component, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import { debounceTime, map, startWith } from 'rxjs';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit, OnDestroy {
  isEmpty = false;
  requestError: any;
  isErrorDisplay: boolean = false;
  isLoading: boolean = true;
  INVENTORY: IInventory[] = [];
  storages: IStorage[];
  products: IProduct[];
  protected inventoryForm: FormGroup;
  protected shownColumn: number | '';
  protected displayedColumns: string[] = [];
  protected sortingColumn: {
    column: number | '',
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
  protected isAddingNewPosition: boolean = false;
  filterStorageInput = new FormControl('')
  storageFilter: string = '';
  storageFilterObs$: Observable<any>

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
    this.filteredStorageOptions = this.chooseStorageForm.valueChanges.pipe(
      startWith(''),
      map((value: string | any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterOptions(name as string, this.storageOptions) : this.storageOptions;
      }),
    );
    this.filteredStorageOptions = this.filterStorageInput.valueChanges.pipe(
      startWith(''),
      map((value: string | any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterOptions(name as string, this.storageOptions) : this.storageOptions;
      }),
    );
    this.storageFilterObs$ = this.filterStorageInput.valueChanges.pipe(
      debounceTime(1000),
    )
    this.storageFilterObs$.subscribe({
      next: (res: string | any) => {
        this.storageFilter = typeof res === 'string' ? res : ''
        this.loadInventory()
      }
    })
    this.filteredProductOptions = this.chooseProductForm.valueChanges.pipe(
      startWith(''),
      map((value: string | any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterOptions(name as string, this.productOptions) : this.productOptions.slice();
      }),
    );
  }

  ngOnDestroy(): void {
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
    this.InventoryService.getInventory(this.storageFilter).subscribe({
      next: (res) => {
        if (!res[0]) {
          this.isEmpty = true;
          this.isLoading = false;
        } else {
          this.isEmpty = false;
          this.INVENTORY = res
          this.displayedColumns = [...Object.keys(this.INVENTORY[0]).filter(
              (item) =>
                !['id', 'createdby', '__v'].some((column) =>
                  item.toLowerCase().includes(column)
                )
            ),
          ];
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  addInventory() {
    this.isAddingNewPosition = false;
    this.isLoading = true;
    this.inventoryForm.disable();
    this.inventoryForm.value.storageId = this.storages.find(
      (item) => item.name === this.chooseStorageForm.value
    )?._id;
    this.inventoryForm.value.productId = this.products.find(
      (item) => item.name === this.chooseProductForm.value
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
        this.isAddingNewPosition = false
        this.isLoading = false;
      },
      error: (error) => {
        this.isErrorDisplay = true;
        this.requestError = error.error.msg;
        console.warn(error);
        this.inventoryForm.enable();
        this.isLoading = false;
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

  private _filterOptions(name: string, options: string[]) {
    const filterValue = name.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
