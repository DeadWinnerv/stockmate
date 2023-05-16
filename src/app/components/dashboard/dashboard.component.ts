import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent {
  buttonValue: 'expenses' | 'orders' | 'stocks' = 'stocks';

  setCurrentGroupValue(value: 'expenses' | 'orders' | 'stocks'): void {
    this.buttonValue = value;
  }
}
