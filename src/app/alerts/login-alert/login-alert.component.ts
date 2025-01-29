import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-alert',
  imports: [NgIf],
  templateUrl: './login-alert.component.html',
  styleUrl: './login-alert.component.css',
})
export class LoginAlertComponent {
  isVisible = false;
  message = '';

  showAlert(message: string) {
    this.message = message;
    this.isVisible = true;
  }
  close() {
    this.isVisible = false;
  }
}
