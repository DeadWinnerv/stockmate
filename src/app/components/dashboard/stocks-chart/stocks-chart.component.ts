import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChartConfiguration, Chart} from 'chart.js';
import { IInventory } from 'src/app/models/inventory';
import { InventoryService } from 'src/app/services/inventory.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-stocks-chart',
  templateUrl: './stocks-chart.component.html',
  styleUrls: ['./stocks-chart.component.scss'],
})
export class StocksChartComponent implements OnInit, AfterViewInit, AfterViewChecked {
  cfg: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [{
        data: []
      }],
    },
    options: {
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: {
          display: true,
          position: 'chartArea'
        }
      }
    }
  }
  storagesList: string[]
  @ViewChild('stocksChart') stocksChartRef: ElementRef<any>
  chart: Chart<'doughnut'>

  constructor(private inventoryService: InventoryService, private storagesService: StorageService) { }
  
  ngOnInit(): void {
    this.inventoryService.getInventory().subscribe((res: IInventory[]) => {
      res.forEach(item => {
        if (this.cfg.data.labels?.includes(item.productName)) {
          this.cfg.data.datasets[0].data[this.cfg.data.labels.indexOf(item.productName)] += item.stock
        } else {
          this.cfg.data.datasets[0].data.push(item.stock)
          this.cfg.data.labels?.push(item.productName)
        }
      })
    })
    this.storagesService.getStorages().subscribe(res => {
      this.storagesList = res.map(item => item.name)
    })
  }
  
  ngAfterViewInit(): void {
    this.chart = new Chart(this.stocksChartRef.nativeElement, this.cfg)
    this.chart.update()
    console.log(this.chart);
    
  }
  ngAfterViewChecked() {
    this.chart.update()
  }
}
