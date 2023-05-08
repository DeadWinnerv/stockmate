import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStorage } from '../models/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private http: HttpClient) {}
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
    return this.http.get<IStorage[]>('https://stockmate-back.onrender.com/storages');
  }
}
