import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { BugButtonComponent } from '../bug-button/bug-button.component';
import { RouterLink, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginAlertComponent } from '../alerts/login-alert/login-alert.component';
import { LoginService } from '../services/login.service';
import {  NgFor, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/user-data.service';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  userData :any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _login: LoginService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private userDataService: UserDataService, 
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
  }
  currentUser: any;
  onLogin() {
   
    if (this.loginForm.valid ) { 
     
      this._login.login(this.loginForm.value).subscribe((response) => {
        if(response){     
        this.authService.login(response.token); 
        this.toggleContent();
        this.cdr.detectChanges();  
        console.log(this.authService);
        } 
        else {
          this.errorMessage = 'Error. Please try again.';
          this.cdr.detectChanges();  
        }
      },
      (error) => {
        this.errorMessage = ' Invalid credentials. Please try again.';
        this.cdr.detectChanges();  
      }
      
      );}
  }

  close(){
    this.errorMessage='' ;
   
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
    const enteredOtp = this.otpArray.join('');
    const { username, password } = this.loginForm.value;

    this._login.verifyOtp(username,password,enteredOtp).subscribe((response) => {
      if (response.data.users_id) {
        this.userDataService.setUserData(response);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  isPasswordVisible: boolean = false;

togglePasswordVisibility() {
  this.isPasswordVisible = !this.isPasswordVisible;
}

}


