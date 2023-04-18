import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translate(-50%,200%)' }),
        animate('0.8s ease-out', style({ transform: 'translate(-50%,-50%)' })),
      ]),
    ]),
  ],
})
export class LoginComponent {}
