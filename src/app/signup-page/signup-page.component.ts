import { Component, ViewChild } from '@angular/core';
import { BugButtonComponent } from '../bug-button/bug-button.component';
import { RouterLink, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignupAlertComponent } from '../alerts/signup-alert/signup-alert.component';

@Component({
  selector: 'app-signup-page',
  imports: [
    BugButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SignupAlertComponent,
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)(?=[^!@#$%^&*()_+=[\]{}|;:'",.<>?/]*[!@#$%^&*()_+=[\]{}|;:'",.<>?/])(?!.*\s).{7,}$/
      ),
    ]),
    referral: new FormControl(''),
  });

  constructor(private router: Router, private userService: UserService) {}

  userRegisterObj: any = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    referral: '',
  };

  onRegister() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;

      const isLocalData = localStorage.getItem('openStorage');
      if (isLocalData != null) {
        const localArray = JSON.parse(isLocalData);
        localArray.push(newUser);
        localStorage.setItem('openStorage', JSON.stringify(localArray));
        this.userService.setCurrentUser(newUser);
      } else {
        const localArray = [];
        localArray.push(this.userRegisterObj);
        localStorage.setItem('openStorage', JSON.stringify(localArray));
      }

      this.router.navigate(['/dashboard'], {
        state: { userData: this.userRegisterObj },
      });
    } else {
      this.triggerAlert();
      this.router.navigate([' ']);
    }
  }

  @ViewChild(SignupAlertComponent) customAlert!: SignupAlertComponent;

  triggerAlert() {
    this.customAlert.showAlert('Fill all required fields');
  }
}
