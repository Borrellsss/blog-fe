import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService } from "../services/utils/auth.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if ((route.url.length > 0) &&
    (route.url[0].path === "welcome" ||
    route.url[0].path === "sign-in" ||
    route.url[0].path === "sign-up")) {
    if (authService.isTokenValid()) {
      router.navigate(["/"]);
      return false;
    }
    return true;
  }
  if (!authService.isTokenValid()) {
    authService.onSignOut();
    router.navigate(["/sign-in"]);
    return false;
  }
  return true;
};
