import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}
  addStorage(storage: Storage): Observable<Storage[]> {
    return this.http.post<Storage[]>(
      'https://stockmate-back.onrender.com/storages',
      storage
    );
  }
  removeStorage(_id: String) {
    return this.http.delete(`https://stockmate-back.onrender.com/storages/${_id}`)
  }
  getStorages(): Observable<Storage[]> {
    return this.http.get<Storage[]>('https://stockmate-back.onrender.com/storages');
  }
}
