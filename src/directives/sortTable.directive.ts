import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSortTable]',
})
export class SortTableDirective implements OnChanges {
  @Input() columnNum: number | 'total' | '';
  @Input() sortDirection: 'asc' | 'desc' | undefined;
  @Input('columns') columns: string[];
  @Input('sortTable') table: any[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sortDirection && !changes.sortDirection.firstChange) {
      typeof this.columnNum !== 'number' ? (this.columnNum = -1) : null;
      this._sortTable(this.columnNum, this.sortDirection);
    }
  }

  private _sortTable(
    columnNum: number | '',
    sortDirection: 'asc' | 'desc' | undefined
  ) {
    const key: string = this.columns[columnNum || 0];
    this.table = this.table.sort((a, b) => {
      if (sortDirection === 'asc') {
        return typeof a[key] === 'string'
          ? a[key].localeCompare(b[key])
          : a[key] - b[key];
      } else if (sortDirection === 'desc') {
        return typeof a[key] === 'string'
          ? b[key].localeCompare(a[key])
          : b[key] - a[key];
      } else {
        return a._id.localeCompare(b._id);
      }
    }) as any;
  }

  public getSortedTable() {
    return this.table;
  }
}
