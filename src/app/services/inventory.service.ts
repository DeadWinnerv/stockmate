import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInventory } from '../models/inventory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  getInventory(): Observable<IInventory[]> {
    return this.http.get<IInventory[]>(
      'https://stockmate-back.onrender.com/inventory'
    );
  }
  addInventory(inventory: IInventory): Observable<IInventory[]> {
    return this.http.post<IInventory[]>(
      'https://stockmate-back.onrender.com/inventory',
      inventory
    );
  }
}
