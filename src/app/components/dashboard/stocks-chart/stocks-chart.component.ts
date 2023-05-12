import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ChartConfiguration, Chart } from 'chart.js';
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
  stocksData: number[] = [];
  productsLabels: string[] = [];
  totalProducts: number = 0;
  doughnutCfg: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: this.productsLabels,
      datasets: [
        {
          data: this.stocksData,
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
  barChartData: { storageName: string, stock: number }[] = []
  barChartCfg: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: this.barChartData.map(item => item.storageName),
      datasets: [
        { data: this.barChartData.map(item => item.stock) }
      ]
    },
    options: {
      maintainAspectRatio: false,
      animation: false,
      responsive: true
    }
  }

  @ViewChildren('stocksChart') stocksChartList: QueryList<ElementRef>;
  stocksChartRefs: ElementRef[];
  charts: Chart<any>[] = [];

  constructor(
    private inventoryService: InventoryService,
    private storagesService: StorageService
  ) {}

  ngOnInit(): void {
    this.storagesService.getStorages().subscribe(
      (res) => {
      this.storagesList = res.sort((a,b) => a.name.localeCompare(b.name)).map((item) => item.name);
      res.forEach(item => {
        this.barChartData.push({
          storageName: item.name,
          stock: 0
        })
      })
    },
    (error) => {
      console.log(error);
    },
    () => {
      this.inventoryService.getInventory().subscribe(
        (res: IInventory[]) => {
        res.forEach((item) => {
          if (this.productsLabels.includes(item.productName)) {
            this.stocksData[this.productsLabels.indexOf(item.productName)] += item.stock;
          } else {
            this.stocksData.push(item.stock);
            this.productsLabels.push(item.productName);
          }
          this.totalProducts += item.stock;
        });
        res.map(item => {
          this.barChartData.find(storage => item.storageName === storage.storageName)!.stock += item.stock
        })
      });
    }
    );
    
  }

  ngAfterViewInit(): void {
    this.stocksChartRefs = this.stocksChartList.toArray();
    this.charts[0] = new Chart(this.stocksChartRefs[0].nativeElement, this.doughnutCfg);
    this.charts[1] = new Chart(this.stocksChartRefs[1].nativeElement, this.barChartCfg)
    
  }
  ngAfterViewChecked() {
    if (this.charts?.length>0) {
      this.charts.forEach((item) => item.update())
      this.charts[1].update()
      console.log(this.barChartData);
      
    }
    
  }
}
