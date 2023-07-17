import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "../services/utils/auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.isSignedIn$
      .subscribe((isSignedIn: boolean) => {
        if (isSignedIn) {
          const jwt = JSON.parse(localStorage.getItem("user")!).jwt;
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${jwt}`
            }
          });
        }
      });
    return next.handle(req);
  }
}
