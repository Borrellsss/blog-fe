import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from "../services/utils/auth.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isTokenValid()) {
    router.navigate(["/welcome"]);
    return false;
  }
  return true;
};
