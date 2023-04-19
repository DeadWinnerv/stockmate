import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-expenses-chart',
  templateUrl: './expenses-chart.component.html',
  styleUrls: ['./expenses-chart.component.scss'],
})
export class ExpensesChartComponent {
  doughnutLabel = 'hi';
  doughnutData: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {data: [53,19,69]}
  ] 
  doughnutLabels: string[] = ['Оружие','Контрабанда','Аптека']

  doughnutOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right'
      }
    }
  }


  

  labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  lineChartData = {
    labels: this.labels,
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
}
