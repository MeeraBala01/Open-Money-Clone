import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const accountGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('currentUser');
  if (isLoggedIn != null) {
    router.navigate(['dashboard']);
    return false;
  } else {
    return true;
  }
};
