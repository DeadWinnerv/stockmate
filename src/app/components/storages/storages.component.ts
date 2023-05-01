import { Component } from '@angular/core';
import { Storage } from 'src/app/models/storage';
@Component({
  selector: 'app-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.scss'],
})
export class StoragesComponent {

  activeStorage: number | undefined = undefined

  storages: Storage[] = [
    {
      id: 16352,
      name: 'Склад 1',
      adress: 'г. Воронеж, ул.Александровская, д.6/1',
      schedule: 'full-time',
    },
    {
      id: 12363,
      name: 'Склад 2',
      adress: 'г. Воронеж, ул. Федора Тютчева, д.99а',
      schedule: 'weekdays',
      phone: '+79008005544',
      email: 'email@mail.com'
    },
    {
      id: 12353,
      name: 'Склад 3',
      adress: 'г. Воронеж, ул., д.6/1',
      schedule: 'full-time',
    },
    {
      id: 52434,
      name: 'Склад 4',
      adress: 'г. Воронеж, ул. Федора, д.99а',
      schedule: 'weekdays',
      phone: '+79008005544',
      email: 'email@mail.com'
    },
    {
      id: 12312,
      name: 'Склад 5',
      adress: ' Harum, repellat veniam! Reprehenderit debitis deserunt animi!',
      schedule: 'full-time',
    },
    {
      id: 21231,
      name: 'Склад 6',
      adress: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      schedule: 'weekdays',
      phone: '+79008005544',
      email: 'email@mail.com'
    }
  ];
}
