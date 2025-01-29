import { Component } from '@angular/core';
import { SideBarComponent } from '../side-nav/side-bar/side-bar.component';
import { RouterOutlet } from '@angular/router';
import { BugButtonComponent } from '../bug-button/bug-button.component';

@Component({
  selector: 'app-layout',
  imports: [SideBarComponent, RouterOutlet, BugButtonComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
