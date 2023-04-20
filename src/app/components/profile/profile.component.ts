import { Component } from '@angular/core';

export interface USER {
  firstName: string,
  secondName: string,
  phone?: number,
  email?: string,
  company: string
}

type TchangeAvatarButton = 'active' | null

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  changeAvatarButton: TchangeAvatarButton = null
  user: USER = {
    firstName: 'Имя',
    secondName: 'Фамилия',
    company: 'Stockmate Inc.'
  }
}
