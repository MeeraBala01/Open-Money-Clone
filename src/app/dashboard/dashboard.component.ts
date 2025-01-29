import { Component } from '@angular/core';
import { HeadBarComponent } from '../head-bar/head-bar.component';

@Component({
  selector: 'app-dashboard',
  imports: [HeadBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
