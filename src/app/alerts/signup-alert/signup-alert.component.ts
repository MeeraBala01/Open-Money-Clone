import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-alert',
  imports: [NgIf],
  templateUrl: './signup-alert.component.html',
  styleUrl: './signup-alert.component.css',
})
export class SignupAlertComponent {
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
