import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginUser, IRegisterUser } from '../models/USER';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = '';


  constructor(private route: Router, private http: HttpClient) { }

  login(user: ILoginUser): Observable<{token: string}>{
    return this.http.post<{token: string}>('https://stockmate-back.onrender.com/auth/login', user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('token', token);
          this.setToken(token);
        })
      )
  }
  register(user: IRegisterUser): Observable<{token: string}>{
    return this.http.post<{token: string}>('https://stockmate-back.onrender.com/auth/register', user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('token', token);
          this.setToken(token);
        })
      )
  }
  setToken(token: string) {
    this.token = token;
  }
  getToken(): string{
    return this.token;
  }
  isAuth(): boolean{
    return !!this.token;
  }
  logout() {
    this.setToken('');
    localStorage.clear();
  }

}
