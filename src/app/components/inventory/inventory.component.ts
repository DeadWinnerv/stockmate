import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface inventoryData {
  id: number;
  name: string;
  storage: string;
  price: number;
  stock: number;
}

type TColumnName = 'id' | 'name' | 'storage' | 'price' | 'stock';

type TSortingColumn = {
  column?: TColumnName;
  direction?: 'asc' | 'desc';
};

const INVENTORY: inventoryData[] = [
  { id: 1, name: 'Зубная щетка', storage: 'Хоругвино', price: 150, stock: 300 },
  { id: 2, name: 'Мыло', storage: 'Хоругвино', price: 80, stock: 404 },
  { id: 1, name: 'Зубная щетка', storage: 'Тверь', price: 150, stock: 33 },
  { id: 3, name: 'Мазь для лица', storage: 'Тверь', price: 342, stock: 112 },
  { id: 2, name: 'Мыло', storage: 'Воронеж', price: 80, stock: 104 },
  { id: 1, name: 'Зубная щетка', storage: 'Воронеж', price: 150, stock: 678 },
  { id: 1, name: 'Зубная щетка', storage: 'Хоругвино', price: 150, stock: 300 },
  { id: 2, name: 'Мыло', storage: 'Хоругвино', price: 80, stock: 404 },
  { id: 1, name: 'Зубная щетка', storage: 'Тверь', price: 150, stock: 33 },
  { id: 3, name: 'Мазь для лица', storage: 'Тверь', price: 342, stock: 112 },
  { id: 2, name: 'Мыло', storage: 'Воронеж', price: 80, stock: 1099 },
  { id: 1, name: 'Зубная щетка', storage: 'Воронеж', price: 150, stock: 678 },
  { id: 1, name: 'Зубная щетка', storage: 'Хоругвино', price: 150, stock: 300 },
  { id: 2, name: 'Мыло', storage: 'Хоругвино', price: 80, stock: 404 },
  { id: 1, name: 'Зубная щетка', storage: 'Тверь', price: 150, stock: 33 },
  { id: 3, name: 'Мазь для лица', storage: 'Тверь', price: 342, stock: 112 },
  { id: 2, name: 'Мыло', storage: 'Воронеж', price: 80, stock: 1099 },
  { id: 1, name: 'Зубная щетка', storage: 'Воронеж', price: 150, stock: 678 },
  { id: 1, name: 'Зубная щетка', storage: 'Хоругвино', price: 150, stock: 300 },
  { id: 2, name: 'Мыло', storage: 'Хоругвино', price: 80, stock: 404 },
  { id: 1, name: 'Зубная щетка', storage: 'Тверь', price: 150, stock: 33 },
  { id: 3, name: 'Мазь для лица', storage: 'Тверь', price: 342, stock: 112 },
  { id: 2, name: 'Мыло', storage: 'Воронеж', price: 80, stock: 1099 },
  { id: 1, name: 'Зубная щетка', storage: 'Воронеж', price: 150, stock: 678 },
];
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements AfterViewInit {
  public displayedColumns: string[] = [
    'id',
    'name',
    'storage',
    'price',
    'stock',
  ];
  
  public dataSource = new MatTableDataSource<inventoryData>(INVENTORY);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  private filteredTable: inventoryData[] = INVENTORY;
  public storageFilter: string = 'all';
  public handleStorageFilterChange(): void {
    this.filteredTable = INVENTORY;
    this.filteredTable = this.filteredTable.filter((item: inventoryData) =>
      this.storageFilter !== 'all' ? item.storage === this.storageFilter : item
    );
    this.dataSource = new MatTableDataSource<inventoryData>(this.filteredTable);
    this.dataSource.paginator = this.paginator;
  }

  public sortingColumn: TSortingColumn = {};

  private sortedData: inventoryData[];

  private sortData(columnName: TColumnName): void {
    
    this.sortedData = this.filteredTable;
    console.log('inventory: \n', this.filteredTable);
    
    console.log('before sorting: \n', this.sortedData);
    
    switch (columnName) {
      case 'id':
        this.sortedData.sort(
          (firstItem: inventoryData, secondItem: inventoryData): number => {
            if (this.sortingColumn.direction === 'asc') {
              return firstItem.id - secondItem.id;
            } else {
              return secondItem.id - firstItem.id;
            }
          }
        );
        break;
      case 'name':
        this.sortedData.sort(
          (firstItem: inventoryData, secondItem: inventoryData): number => {
            if (this.sortingColumn.direction === 'asc') {
              return firstItem.name.localeCompare(secondItem.name)
            } else {
              return secondItem.name.localeCompare(firstItem.name)
            }
          }
        );
        break;
      case 'price':
        this.sortedData.sort(
          (firstItem: inventoryData, secondItem: inventoryData): number => {
            if (this.sortingColumn.direction === 'asc') {
              return firstItem.price - secondItem.price;
            } else {
              return secondItem.price - firstItem.price;
            }
          }
        );
        break;
      case 'stock':
        this.sortedData.sort(
          ((firstItem: inventoryData, secondItem: inventoryData): number => {
            if (this.sortingColumn.direction === 'asc') {
              return firstItem.stock - secondItem.stock;
            } else {
              return secondItem.stock - firstItem.stock;
            }
          }
          )
        );
        break;
      default:
        this.sortedData = this.filteredTable
        break;
    }
    console.log('after sorting: \n',this.sortedData);
    
    this.dataSource = new MatTableDataSource<inventoryData>(this.sortedData)
    this.dataSource.paginator = this.paginator
  }

  handleSortChange(columnName: TColumnName): void {
    if (
      !this.sortingColumn?.column ||
      this.sortingColumn.column !== columnName
    ) {
      this.sortingColumn = { column: columnName, direction: 'desc' };
    } else if (this.sortingColumn.direction === 'desc') {
      this.sortingColumn.direction = 'asc';
    } else {
      this.sortingColumn = {};
    }
    this.sortData(columnName);
  }
}
