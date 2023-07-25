import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from "../services/utils/auth.service";

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.getUser() || authService.getUser()?.role?.authority !== "ROLE_SUPER_ADMIN") {
    router.navigate(['../']);
    return false;
  }
  return true;
};
