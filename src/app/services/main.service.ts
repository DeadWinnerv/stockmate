import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IStorage } from '../models/storage';
import { IProduct } from '../models/product';
import { IInventory } from '../models/inventory';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}
  inventory: IInventory[];
  products: IProduct[];
  storages: IStorage[];
  addStorage(storage: IStorage): Observable<IStorage[]> {
    return this.http.post<IStorage[]>(
      'https://stockmate-back.onrender.com/storages',
      storage
    );
  }
  removeStorage(_id: String) {
    return this.http.delete(`https://stockmate-back.onrender.com/storages/${_id}`)
  }
  getStorages(): Observable<IStorage[]> {
    this.http.get<IStorage[]>('https://stockmate-back.onrender.com/storages').pipe(tap((storages) => {
      this.storages = storages;
    }))
    return this.http.get<IStorage[]>('https://stockmate-back.onrender.com/storages');
  }

  addProduct(product: IProduct): Observable<IProduct[]> {
    return this.http.post<IProduct[]>('https://stockmate-back.onrender.com/products', product)
  }
  getProducts(): Observable<IProduct[]>{
    this.http.get<IProduct[]>('https://stockmate-back.onrender.com/products').pipe(tap((products) => {
      this.products = products;
    }))
    return this.http.get<IProduct[]>('https://stockmate-back.onrender.com/products')
  }

  getInventory(): Observable<IInventory[]>{
    this.http.get<IInventory[]>('https://stockmate-back.onrender.com/inventory').pipe(tap((inventory) => {
      this.inventory = inventory;
    }))
    return this.http.get<IInventory[]>('https://stockmate-back.onrender.com/inventory')
  }
  addInventory(inventory: IInventory): Observable<IInventory[]>{
    return this.http.post<IInventory[]>('https://stockmate-back.onrender.com/inventory', inventory)
  }
}
