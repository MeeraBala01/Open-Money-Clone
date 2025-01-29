import { Component, input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserService } from '../user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-head-bar',
  imports: [
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatSidenavModule,
    MatIconModule,
  ],
  templateUrl: './head-bar.component.html',
  styleUrl: './head-bar.component.css',
})
export class HeadBarComponent {
  label = input('');

  currentUser: any;

  constructor(private userService: UserService) {}

  clear() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
