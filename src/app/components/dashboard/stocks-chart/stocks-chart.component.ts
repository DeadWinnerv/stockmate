import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-stocks-chart',
  templateUrl: './stocks-chart.component.html',
  styleUrls: ['./stocks-chart.component.scss']
})
export class StocksChartComponent {
  doughnutData: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {data: [1053,519,869]}
  ] 
  doughnutLabels: string[] = ['Оружие','Контрабанда','Аптека']
}
