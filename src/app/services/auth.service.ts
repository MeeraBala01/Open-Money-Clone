import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey); 
  }

  login(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  logout() {
    localStorage.removeItem(this.tokenKey); 
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); 
  }

 

}

//accounts id, company id, token
