import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from "rxjs";

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
