import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from "../services/utils/auth.service";

export const superAdminAndAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.getUser() ||
    (authService.getUser()?.role?.authority !== "ROLE_SUPER_ADMIN" && authService.getUser()?.role?.authority !== "ROLE_ADMIN")) {
    router.navigate(['../']);
    return false;
  }
  return true;
};
