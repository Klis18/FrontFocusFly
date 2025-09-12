import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const notAuthenticatedGuard: CanMatchFn = (route, segments) => {

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if(token){
    router.navigateByUrl('');
    return false;
  }

  return true;
};
