import { Component } from '@angular/core';
import { HeadBarComponent } from '../../head-bar/head-bar.component';
@Component({
  selector: 'app-cashflow',
  imports: [HeadBarComponent],
  templateUrl: './cashflow.component.html',
  styleUrl: './cashflow.component.css',
  standalone: true,
})
export class CashflowComponent {}
