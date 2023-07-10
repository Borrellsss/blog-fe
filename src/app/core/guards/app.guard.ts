import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

export const appGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  console.log("appGuard");
  return false;
};
