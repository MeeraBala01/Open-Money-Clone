
import { Component, OnInit } from '@angular/core';
import { HeadBarComponent } from '../head-bar/head-bar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserDataService } from '../services/user-data.service';
import { NgIf } from '@angular/common';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({  
  selector: 'app-profile',
  imports: [HeadBarComponent, MatSlideToggleModule, NgIf,MatFormFieldModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  userData: any;

  constructor(private userDataService: UserDataService) {}

  ngOnInit() {
    this.userDataService.userData$.subscribe(data => {
      
        this.userData = data;
        const tokenValue = this.userDataService.getToken();
        const accountId = this.userDataService.getAccountId();
        const companyId = this.userDataService.getCompanyId();

        console.log('Token value is:', tokenValue);
        console.log('Account ID is:', accountId);
        console.log('Company ID is:', companyId);
      
    });
  }


  overlayTeam = false;
  openFormDialog() {
    this.overlayTeam = true;
  }

  closeFormDialog() {
    this.overlayTeam = false;
  }
  changePassword(){

  }

}

