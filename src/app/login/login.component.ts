import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../types';
import { SessionStorageService } from '../session-storage.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    builder: FormBuilder,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {
    const session = this.sessionStorageService.getSession();

    if (session) {
      this.router.navigate(['/']);
    }

    this.form = builder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  signIn() {
    if (this.form.valid) {
      this.authService
        .signIn(this.form.value)
        .pipe(
          map((data) => {
            if (!data) {
              this.form.controls['email'].setErrors({ email: true });
              this.form.controls['password'].setErrors({ password: true });
            } else {
              this.router.navigate(['/']);
              this.sessionStorageService.setItem(data);
            }
          })
        )
        .subscribe();
    }
  }
}
