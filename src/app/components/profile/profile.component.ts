import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export interface USER {
  firstName: string;
  lastName: string;
  phone?: number;
  email?: string;
  company: string;
  login: string;
  _id: string;
  avatar?: string;
}

type TchangeAvatarButton = 'active' | null;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef;
  changeAvatarButton: TchangeAvatarButton = null;
  user: USER;
  aSub: Subscription;
  avatar: File;
  avatarPath: string | undefined;
  uploadError: any;
  isErrorDisplay: boolean = false;
  isEditingProfile: boolean = false;
  isLoading: boolean = true;
  constructor(private auth: AuthService) {}
  checkExtension(): boolean {
    let ext: any = this.avatar.name.split('.').pop();
    let ext_arr = ['jpeg', 'png', 'jpg', 'gif', 'svg'];
    if (!ext_arr.includes(ext)) return false;
    else return true;
  }
  onFileUpload(event: any) {
    let obs$;
    const file = event.target.files[0];
    this.avatar = file;
    obs$ = this.auth.uploadAvatar(this.avatar);
    if (!this.checkExtension()) {
      this.uploadError = 'Неверный тип файла';
      this.isErrorDisplay = true;
    } else {
      obs$.subscribe({
        next: (res) => {
          this.user.avatar = res.avatar;
          this.avatarPath =
            'https://stockmate-back.onrender.com' + this.user.avatar;
        },
        error: (err: any) => {
          this.uploadError = err.error.message;
          this.isErrorDisplay = true;
        },
      });
    }
  }

  handleClickAvatar(): void {
    this.inputRef.nativeElement.click();
  }
  ngOnInit(): void {
    this.aSub = this.auth.getMe().subscribe({
      next: () => {
        this.user = this.auth.user;
        this.user.avatar
          ? (this.avatarPath =
              'https://stockmate-back.onrender.com' + this.user.avatar)
              
          : (this.avatarPath = `https://placehold.co/180x180/FF9500/3E3E3E/?text=${
              this.user.firstName[0] + '+' + this.user.lastName[0]
            }&font=Montserrat`);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  editProfile(): void {
    this.isEditingProfile = !this.isEditingProfile
  }
}
