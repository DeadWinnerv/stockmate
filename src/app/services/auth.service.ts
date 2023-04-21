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

  constructor(private route: Router, private http: HttpClient) { }

  login(user: ILoginUser): Observable<{token: string}>{
    return this.http.post<{token: string}>('https://stockmate-back.onrender.com/auth/login', user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('token', token);
          console.log('success!');
        })
      )
  }
  register(user: IRegisterUser): Observable<{token: string}>{
    return this.http.post<{token: string}>('https://stockmate-back.onrender.com/auth/register', user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('token', token);
        })
      )
  }
  isAuth(): boolean{
    return !!localStorage.getItem("token");
  }
  logout() {
    localStorage.removeItem("token");
  }

}
