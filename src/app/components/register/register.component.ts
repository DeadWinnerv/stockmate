import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  regForm: FormGroup;
  aSub: Subscription;
  registerError: any;
  isErrorDisplay: boolean = false;
  constructor(private auth: AuthService, private router: Router) {}
  submitRegister() {
    this.regForm.disable();
    this.aSub = this.auth.register(this.regForm.value).subscribe({
      next: () => {
          this.router.navigate(['']);
      },
      error: error => {
        this.isErrorDisplay = true;
        this.registerError = error.error.msg;
          console.warn(error);
          this.regForm.enable();
      }
  });
  }
  ngOnInit(): void {
    this.regForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
        ),
      ]),
      firstName: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      company: new FormControl('', [
        Validators.required,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i),
      ]),
    });
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
