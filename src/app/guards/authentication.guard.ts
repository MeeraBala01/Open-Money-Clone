import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// export const authenticationGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const loggedIn = localStorage.getItem('currentUser');
//   if (loggedIn != null) {
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false;
//   }
// };

export const authenticationGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
