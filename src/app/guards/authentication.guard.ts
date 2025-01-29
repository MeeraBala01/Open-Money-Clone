import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedIn = localStorage.getItem('currentUser');
  if (loggedIn != null) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
