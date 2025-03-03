import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData = new BehaviorSubject<any>(this.getUserDataFromStorage());
  userData$ = this.userData.asObservable();

  private tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());
  private accountIdSubject = new BehaviorSubject<string | null>(this.getStoredAccountId());
  private companyIdSubject = new BehaviorSubject<string | null>(this.getStoredCompanyId());

  public token$ = this.tokenSubject.asObservable();
  public accountId$ = this.accountIdSubject.asObservable();
  public companyId$ = this.companyIdSubject.asObservable();

  constructor() {}

  private getUserDataFromStorage() {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('token');
  }

  private getStoredAccountId(): string | null {
    return localStorage.getItem('accountId');
  }

  private getStoredCompanyId(): string | null {
    return localStorage.getItem('companyId');
  }

  setUserData(data: any) {
    this.userData.next(data);
    localStorage.setItem('userData', JSON.stringify(data));

    if (data?.meta) {
      this.tokenSubject.next(data.meta.token);
      this.accountIdSubject.next(data.meta.claims.accounts_id);
      this.companyIdSubject.next(data.meta.claims.companies_id);

      localStorage.setItem('token', data.meta.token);
      localStorage.setItem('accountId', data.meta.claims.accounts_id);
      localStorage.setItem('companyId', data.meta.claims.companies_id);
    }
  }

  getUserData() {
    return this.userData.getValue();
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getAccountId(): string | null {
    return this.accountIdSubject.value;
  }

  getCompanyId(): string | null {
    return this.companyIdSubject.value;
  }

  clearUserData() {
    this.userData.next(null);
    this.tokenSubject.next(null);
    this.accountIdSubject.next(null);
    this.companyIdSubject.next(null);

    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('accountId');
    localStorage.removeItem('companyId');
  }
}








// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserDataService {
//   private userData = new BehaviorSubject<any>(this.getUserDataFromStorage());
//   userData$ = this.userData.asObservable();

//   constructor() { }

//   private getUserDataFromStorage() {
//     return JSON.parse(localStorage.getItem('userData') || '{}');
//   }

//   setUserData(data: any) {
//     this.userData.next(data); 
//     localStorage.setItem('userData', JSON.stringify(data)); 
//   }

//   getUserData() {
//     return this.userData.getValue();
//   }

//   clearUserData() {
//     this.userData.next(null);
//     localStorage.removeItem('userData');
//   }
// }
