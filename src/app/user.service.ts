import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  setCurrentUser(data: any) {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '');
  }
}
