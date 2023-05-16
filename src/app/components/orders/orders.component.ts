import { Component, ViewChild } from '@angular/core';
import { ORDERS } from './ORDERS';
import { IOrder } from 'src/app/models/order';
import { SortTableDirective } from 'src/directives/sortTable.directive';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  isLoading: boolean = false;
  orders: IOrder[] = [...ORDERS];
  protected displayedColumns: string[] = [
    ...Object.keys(this.orders[0]).filter(
      (item) =>
        !['id', 'createdby', '__v'].some((column) =>
          item.toLowerCase().includes(column)
        )
    ),
  ];
  protected sortingColumn: {
    column: number | 'total' | '';
    direction?: 'asc' | 'desc';
  } = {
    column: '',
  };
  protected shownColumn: number | 'total' | '';
  protected shownDetails: number | undefined

  @ViewChild(SortTableDirective) sortTableDirective: SortTableDirective;

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
      this.orders = this.sortTableDirective.getSortedTable()
    } else if (this.sortingColumn.direction === 'asc') {
      this.sortingColumn.direction = 'desc'
      this.orders = this.sortTableDirective.getSortedTable()
    } else {
      this.shownColumn = ''
      this.sortingColumn.column = ''
      this.sortingColumn.direction = undefined
    }
  }

  showDetails(i: number) {
    this.shownDetails === i
    ? this.shownDetails = undefined
    : this.shownDetails = i
  }
}
