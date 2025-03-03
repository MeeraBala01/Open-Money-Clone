import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const accountGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
 if(authService.isLoggedIn()){

  router.navigate(['/dashboard']);
  return false; 
 }
 else{
  return true;
 }
};



