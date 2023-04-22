import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginUser, IRegisterUser } from '../models/USER';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private route: Router, private http: HttpClient) {}
  user: any;
  authUser: any = null;
  login(user: ILoginUser): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(
        'https://stockmate-back.onrender.com/auth/login',
        user
      )
      .pipe(
        tap((user) => {
          localStorage.setItem('token', user.token);
          this.authUser = user;
        })
      );
  }
  register(user: IRegisterUser): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(
        'https://stockmate-back.onrender.com/auth/register',
        user
      )
      .pipe(
        tap((user) => {
          localStorage.setItem('token', user.token);
          this.authUser = user;
        })
      );
  }
  isAuth(): boolean {
    this.http.get('https://stockmate-back.onrender.com/auth/me').subscribe(user => {
      this.authUser = user;
    })
    console.log(this.authUser)
    return (!!this.authUser || !!localStorage.getItem('token'));
  }
  logout() {
    localStorage.removeItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getMe():any{
    return this.http
      .get(
        'https://stockmate-back.onrender.com/auth/me')
      .pipe(
        tap((user) => {
          this.user = user;
        })
      );
  }
}
