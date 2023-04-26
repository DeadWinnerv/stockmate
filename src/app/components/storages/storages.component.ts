import { Component } from '@angular/core';
import { Storage } from 'src/app/models/storage';

@Component({
  selector: 'app-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.scss'],
})
export class StoragesComponent {
  panelOpenState: boolean = closed; 
  addStorageWindowOpen: boolean = false;
  storages: Storage[] = [
    {
      id: 1,
      name: 'Склад 1',
      adress: 'г. Воронеж, ул.Александровская, д.6/1',
      schedule: 'full-time',
    },
    {
      id: 2,
      name: 'Склад 2',
      adress: 'г. Воронеж, ул. Федора Тютчева, д.99а',
      schedule: 'weekdays',
      phone: '+79008005544',
      email: 'email@mail.com'
    }
  ];
}
