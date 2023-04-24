import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort, Sort } from '@angular/material/sort'
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface inventoryData {
  skuid: number,
  name: string,
  storage: string,
  price: number,
  stock: number,
}

const INVENTORY: inventoryData[] = [
  {skuid: 1, name: 'Зубная щетка', storage: 'Хоругвино', price: 150, stock: 300},
  {skuid: 2, name:'Мыло', storage: 'Хоругвино', price: 80, stock: 404},
  {skuid: 1, name: 'Зубная щетка', storage: 'Тверь', price: 150, stock: 33},
  {skuid: 3, name: 'Мазь для лица', storage: 'Тверь', price: 342, stock: 112},
  {skuid: 2, name: 'Мыло', storage: 'Воронеж', price: 80, stock: 1099},
  {skuid: 1, name: 'Зубная щетка', storage: 'Воронеж', price: 150, stock: 678},
  {skuid: 1, name: 'Зубная щетка', storage: 'Хоругвино', price: 150, stock: 300},
  {skuid: 2, name:'Мыло', storage: 'Хоругвино', price: 80, stock: 404},
  {skuid: 1, name: 'Зубная щетка', storage: 'Тверь', price: 150, stock: 33},
  {skuid: 3, name: 'Мазь для лица', storage: 'Тверь', price: 342, stock: 112},
  {skuid: 2, name: 'Мыло', storage: 'Воронеж', price: 80, stock: 1099},
  {skuid: 1, name: 'Зубная щетка', storage: 'Воронеж', price: 150, stock: 678},
  {skuid: 1, name: 'Зубная щетка', storage: 'Хоругвино', price: 150, stock: 300},
  {skuid: 2, name:'Мыло', storage: 'Хоругвино', price: 80, stock: 404},
  {skuid: 1, name: 'Зубная щетка', storage: 'Тверь', price: 150, stock: 33},
  {skuid: 3, name: 'Мазь для лица', storage: 'Тверь', price: 342, stock: 112},
  {skuid: 2, name: 'Мыло', storage: 'Воронеж', price: 80, stock: 1099},
  {skuid: 1, name: 'Зубная щетка', storage: 'Воронеж', price: 150, stock: 678},
  {skuid: 1, name: 'Зубная щетка', storage: 'Хоругвино', price: 150, stock: 300},
  {skuid: 2, name:'Мыло', storage: 'Хоругвино', price: 80, stock: 404},
  {skuid: 1, name: 'Зубная щетка', storage: 'Тверь', price: 150, stock: 33},
  {skuid: 3, name: 'Мазь для лица', storage: 'Тверь', price: 342, stock: 112},
  {skuid: 2, name: 'Мыло', storage: 'Воронеж', price: 80, stock: 1099},
  {skuid: 1, name: 'Зубная щетка', storage: 'Воронеж', price: 150, stock: 678},
];
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})

export class InventoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['skuid','name', 'storage', 'price', 'stock']
  dataSource = new MatTableDataSource<inventoryData>(INVENTORY)
  
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  announceSortChange(sortState: Sort | any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`)
    } else {
      this._liveAnnouncer.announce(`Soring cleared`)
    }
  }
}
