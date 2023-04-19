import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-orders-chart',
  templateUrl: './orders-chart.component.html',
  styleUrls: ['./orders-chart.component.scss']
})
export class OrdersChartComponent {

  doughnutData: ChartConfiguration<'doughnut'>['data']['datasets'] = [{
    data: [2,5,1,0]
  }]
  doughnutLabels: string[] = ['Хоругвино', 'Тверь', 'Новосибирск', 'Воронеж']

}
