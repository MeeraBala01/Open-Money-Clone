import { Component, input,OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { TeamService } from '../services/team.service';

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
  teamData : any;
  currentUser: any;
  teamRoles: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userDataService:UserDataService,
    private teamService: TeamService
    ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.userDataService.clearUserData();

  }

ngOnInit():void{}

teamDetails(){

  this.teamService.teamData().subscribe(
    (response) => {
     console.log(response);
      this.teamData = response;
    });

    this.teamService.teamRoles().subscribe(
      (response) => {
       console.log(response);
        this.teamRoles = response;
      });
}
}
