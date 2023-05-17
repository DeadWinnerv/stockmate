import { HttpClient } from '@angular/common/http';
import { IOrder } from '../models/order';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrdersList(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('https://stockmate-back.onrender.com/orders')
  }
}
