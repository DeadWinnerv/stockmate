import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  AfterViewChecked,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ChartConfiguration, Chart } from 'chart.js';
import { combineLatest, map } from 'rxjs';
import { IInventory } from 'src/app/models/inventory';
import { InventoryService } from 'src/app/services/inventory.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-stocks-chart',
  templateUrl: './stocks-chart.component.html',
  styleUrls: ['./stocks-chart.component.scss'],
})
export class StocksChartComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  isLoading: boolean = true;
  stocksData: {
    byStock: number[];
    byTotalPrice: number[];
  } = {
    byStock: [],
    byTotalPrice: [],
  };
  productsLabels: string[] = [];
  totalProducts: number = 0;
  dougnutChartBy: 'byCount' | 'byTotalPrice' = 'byCount';
  doughnutCfg: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: this.productsLabels,
      datasets: [
        {
          data:
            this.dougnutChartBy === 'byCount'
              ? this.stocksData.byStock
              : this.stocksData.byTotalPrice,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: {
          display: true,
          position: 'left',
          title: {
            display: true,
            text: `Всего позиций: ${this.totalProducts}`,
            font: {
              family: 'Montserrat',
              size: 16,
            },
          },
        },
      },
    },
  };
  storagesList: string[] = [];
  barChartData: { storageName: string; stock: number }[] = [];
  barChartCfg: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: this.barChartData.map((item) => item.storageName),
      datasets: [
        { data: this.barChartData.map((item) => item.stock), label: '' },
      ],
    },
    options: {
      maintainAspectRatio: false,
      animation: false,
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  @ViewChildren('stocksChart') stocksChartList: QueryList<ElementRef>;
  stocksChartRefs: ElementRef[];
  charts: Chart<any>[] = [];

  constructor(
    private inventoryService: InventoryService,
    private storagesService: StorageService
  ) {}


  ngOnInit(): void {
    combineLatest([
      this.storagesService.getStorages(),
      this.inventoryService.getInventory(),
    ])
      .pipe(
        map(([storages, inventory]: [any[], IInventory[]]) => {
          this.storagesList = storages.map((item) => item.name);
          storages.forEach((item) => {
            this.barChartData.push({
              storageName: item.name,
              stock: 0,
            });
          });
          inventory.forEach((item) => {
            if (this.productsLabels.includes(item.productName)) {
              this.stocksData.byStock[
                this.productsLabels.indexOf(item.productName)
              ] += item.stock;
              this.stocksData.byTotalPrice[
                this.productsLabels.indexOf(item.productName)
              ] += item.stock * item.productPrice;
            } else {
              this.stocksData.byStock.push(item.stock);
              this.stocksData.byTotalPrice.push(item.stock * item.productPrice);
              this.productsLabels.push(item.productName);
            }
            this.totalProducts += item.stock;

            this.barChartData.find(
              (storage) => item.storageName === storage.storageName
            )!.stock += item.stock;
            this.barChartData.find(
              (storage) => item.storageName === storage.storageName
            )!.stock += item.stock;
          });
        })
      )
      .subscribe({
        complete: () => {
          this.isLoading = false;
        },
        error: (err) => console.error(err),
      });
  }

  ngAfterViewInit(): void {
    this.stocksChartRefs = this.stocksChartList.toArray();
    this.charts[0] = new Chart(
      this.stocksChartRefs[0].nativeElement,
      this.doughnutCfg
    );
    this.charts[1] = new Chart(
      this.stocksChartRefs[1].nativeElement,
      this.barChartCfg
    );
  }
  ngAfterViewChecked() {
    if (this.charts?.length > 0) {
      this.barChartCfg.data.datasets[0].data = this.barChartData.map(
        (item) => item.stock
      );
      this.barChartCfg.data.labels = this.barChartData.map(
        (item) => item.storageName
      );
      this.charts.forEach((item) => item.update());
    }
  }
}
