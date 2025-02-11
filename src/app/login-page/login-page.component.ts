import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { BugButtonComponent } from '../bug-button/bug-button.component';
import { RouterLink, Router } from '@angular/router';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  FormArray,
} from '@angular/forms';
import { UserService } from '../user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginAlertComponent } from '../alerts/login-alert/login-alert.component';
import { LoginService } from '../services/login.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [
    BugButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    LoginAlertComponent,
    NgIf,
    NgFor,
    FormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private _login: LoginService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    console.log(this.otp[0]);
  }
  isOriginal: boolean = true;

  toggleContent() {
    this.isOriginal = !this.isOriginal;
    this.errorMessage = '';
  }
  currentUser: any;
  onLogin() {
    if (this.loginForm.valid) {
      this._login.login(this.loginForm.value).subscribe((response) => {});
      this.toggleContent();
    } else {
      this.errorMessage;
    }
  }

  otp: string[] = new Array(6).fill('');
  otpArray = Array(6).fill('');

  moveFocus(event: any, index: number) {
    const input = event.target;
    const value = input.value;
    if (value && index < 5) {
      input.nextElementSibling?.focus();
    }
  }

  handleBackspace(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && index > 0 && !input.value) {
      const prevInput = input.previousElementSibling as HTMLInputElement | null;
      prevInput?.focus();
    }
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  submitOtp() {
    console.log('clicked');
    const enteredOtp = this.otpArray.join('');

    this._login.verifyOtp(enteredOtp).subscribe((response) => {
      if (response.data.users_id) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
  // this._login
  //   .verifyOtp(
  //     {
  //       username: this.loginForm.value.username,
  //       password: this.loginForm.value.password,
  //     },
  //     enteredOtp
  //   )
  //   .subscribe((response) => {
  //     if (response.success) {
  //       this.router.navigate(['']); // ✅ Redirect on successful OTP verification
  //     }
  //   });
}

//     if (currentUser) {
//       this.userService.setCurrentUser(currentUser);
//       this.router.navigate(['/dashboard']);
//     } else {
//       this.triggerAlert();
//     }
//   } else {
//     this.triggerAlert1();
//   }
// } else {
//   this.triggerAlert2();
// }

// @ViewChild(LoginAlertComponent) customAlert!: LoginAlertComponent;

// triggerAlert() {
//   this.customAlert.showAlert('Incorrect Username or Password');
// }

// triggerAlert1() {
//   this.customAlert.showAlert('User non-existing, Sign-Up');
// }

// triggerAlert2() {
//   this.customAlert.showAlert('Please enter valid credentials');
// }
