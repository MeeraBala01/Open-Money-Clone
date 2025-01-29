import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BugButtonComponent } from '../bug-button/bug-button.component';
import { RouterLink, Router } from '@angular/router';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { UserService } from '../user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginAlertComponent } from '../alerts/login-alert/login-alert.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-page',
  imports: [
    BugButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    LoginAlertComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private _login: LoginService
  ) {}

  onLogin() {
    if (this.loginForm.valid) {
      const isLocalData = localStorage.getItem('openStorage');
      if (isLocalData != null) {
        const users = JSON.parse(isLocalData);

        const currentUser = users.find(
          (m: any) =>
            m.username === this.loginForm.value.email &&
            m.password === this.loginForm.value.password
        );

        if (currentUser) {
          this.userService.setCurrentUser(currentUser);

          this.router.navigate(['/dashboard']);
        } else {
          this.triggerAlert();
        }
      } else {
        this.triggerAlert1();
      }
    } else {
      this.triggerAlert2();
    }
  }

  @ViewChild(LoginAlertComponent) customAlert!: LoginAlertComponent;

  triggerAlert() {
    this.customAlert.showAlert('Incorrect Username or Password');
  }

  triggerAlert1() {
    this.customAlert.showAlert('User non-existing, Sign-Up');
  }

  triggerAlert2() {
    this.customAlert.showAlert('Please enter valid credentials');
  }
}
