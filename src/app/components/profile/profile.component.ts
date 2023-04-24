import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export interface USER {
  firstName: string,
  lastName: string,
  phone?: number,
  email?: string,
  company: string,
  login: string,
  _id: string
}

type TchangeAvatarButton = 'active' | null

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  changeAvatarButton: TchangeAvatarButton = null
  user: USER;
  aSub: Subscription;
  constructor(private auth: AuthService) {

  }
  ngOnInit(): void{
    this.aSub = this.auth.getMe().subscribe({
      next: () => {
          this.user = this.auth.user;
      },
      error: (err: any) => {
        console.log(err);
      }
  });
  }
}
