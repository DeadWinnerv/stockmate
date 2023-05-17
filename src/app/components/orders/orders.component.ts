import { Component, OnInit, ViewChild } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { SortTableDirective } from 'src/directives/sortTable.directive';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  isLoading: boolean = false;
  ordersList: IOrder[];
  protected activeFilter: 'created' | 'paid' | 'delievering' | 'acceptence' | 'completed' = 'created'
  protected displayedColumns: string[] = [];
  protected sortingColumn: {
    column: number | 'total' | '';
    direction?: 'asc' | 'desc';
  } = {
    column: '',
  };
  protected shownColumn: number | 'total' | '';
  protected shownDetails: number | undefined;
  protected isAddingNewOrder = false;
  protected isTableEmpty = false;

  @ViewChild(SortTableDirective) sortTableDirective: SortTableDirective;

  constructor(private ordersService: OrdersService) { }
  ngOnInit(): void {
    this.loadOrdersList()
  }

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
          ]
        } else {
          this.isTableEmpty = true;
        }
        this.isLoading = false
      },
      error: (err) => console.log(err)
    })
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
      this.ordersList = this.sortTableDirective.getSortedTable()
    } else if (this.sortingColumn.direction === 'asc') {
      this.sortingColumn.direction = 'desc'
      this.ordersList = this.sortTableDirective.getSortedTable()
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
