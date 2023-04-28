import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface inventoryData {
  id: number;
  name: string;
  storage: string;
  price: number;
  stock: number;
}

const INVENTORY: inventoryData[] = [
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
  displayedColumns: string[] = ['id', 'name', 'storage', 'price', 'stock'];
  dataSource = new MatTableDataSource<inventoryData>(INVENTORY);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild('tableSort') tableSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.tableSort;
  }

  announceSortChange(sortState: Sort | any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce(`Soring cleared`);
    }
  }
  sortedTable: inventoryData[] = INVENTORY;
  storageFilter: string = 'all';
  handleStorageFilterChange(): void {
    this.sortedTable = INVENTORY;
    this.sortedTable = this.sortedTable.filter((item: inventoryData) =>
      this.storageFilter !== 'all' ? item.storage === this.storageFilter : item
    );
    this.dataSource = new MatTableDataSource<inventoryData>(this.sortedTable);
  }
}
