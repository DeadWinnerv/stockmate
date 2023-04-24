import { Component, OnInit, inject } from '@angular/core';
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
  
  private authService = inject(AuthService)
  ngOnInit(): void{
    this.aSub = this.authService.getMe().subscribe({
      next: () => {
          this.user = this.authService.user;
      },
      error: (err: any) => {
        console.log(err);
      }
  });
  }
}
