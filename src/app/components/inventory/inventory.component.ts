import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { INVENTORY as inventoryData } from 'src/app/constants/INVENTORY';

export interface inventoryData {
  id: number;
  name: string;
  storage: string;
  price: number;
  stock: number;
}

type TColumnName = 'id' | 'name' | 'storage' | 'price' | 'stock' | '';

type TSortingColumn = {
  column?: TColumnName;
  direction?: 'asc' | 'desc';
};

const INVENTORY: inventoryData[] = inventoryData

type TShownColumn = 'id' | 'name' | 'storage' | 'price' | 'stock' | ''
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
  private sortedTable: inventoryData[] = [...INVENTORY];
  private filteredTable: inventoryData[] = [...INVENTORY];
  public storageFilter = 'all';
  public sortingColumn: TSortingColumn = {};
  public shownColumn: string = ''

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  handleStorageFilterChange(): void {
    this.sortingColumn = {}
    this.filteredTable = [...INVENTORY]
    this.filteredTable = this.filteredTable.filter((item) =>
      this.storageFilter !== 'all' ? item.storage === this.storageFilter : true
    );
    this.dataSource = new MatTableDataSource<inventoryData>(this.filteredTable);
    this.dataSource.paginator = this.paginator;
  }

  private sortData(columnName: TColumnName): void {
    this.sortedTable = [...this.filteredTable]
    const compareFn = (a: inventoryData, b: inventoryData): number => {
      const direction = this.sortingColumn.direction === 'asc' ? 1 : -1;
      switch (columnName) {
        case 'id':
          return direction * (a.id - b.id);
        case 'name':
          return direction * a.name.localeCompare(b.name);
        case 'price':
          return direction * (a.price - b.price);
        case 'stock':
          return direction * (a.stock - b.stock);
        default:
          return 0;
      }
    };
    
    !this.sortingColumn.direction
    ? this.sortedTable = [...this.filteredTable]
    : this.sortedTable.sort(compareFn)

    this.dataSource = new MatTableDataSource<inventoryData>(this.sortedTable);
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
