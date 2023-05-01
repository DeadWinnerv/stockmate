import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  loginForm: FormGroup;
  aSub: Subscription;
  loginError: any;
  isErrorDisplay: boolean = false;
  constructor(private auth: AuthService, private router: Router) {}
  submitLogin() {
    this.loginForm.disable();
    this.isLoading = true;
    this.aSub = this.auth.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (error) => {
        this.isErrorDisplay = true;
        this.loginError = error.error.msg;
        console.warn(error);
        this.loginForm.enable();
      },
    });
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
        ),
      ]),
    });
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
