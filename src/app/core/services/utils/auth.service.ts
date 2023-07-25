import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

import { SignInOutputDto } from "../../../shared/models/output/users/sign-in-output-dto";
import { SignUpOutputDto } from "../../../shared/models/output/users/sign-up-output-dto";
import { UserOutputDto } from "../../../shared/models/output/users/user-output-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSignedIn$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  onSignUp(signUpOutputDto: SignUpOutputDto): void {
    this.onSignOut();
    localStorage.setItem("user", signUpOutputDto.username);
  }
  onSignIn(signInOutputDto: SignInOutputDto): void {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }
    localStorage.setItem("token", JSON.stringify(signInOutputDto));
    this.isSignedIn$.next(true);
  }
  onSignOut(): void {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      this.isSignedIn$.next(false);
    }
  }
  getUser(): UserOutputDto | null {
    if (!localStorage.getItem("token")) {
      return null;
    }
    return JSON.parse(this.parseJwt(localStorage.getItem("token")).user);
  }
  isTokenValid(): boolean {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token")!).jwt;
      const payload = this.parseJwt(token);
      if (!payload || !this.isTokenExpired(payload.exp)) {
        this.isSignedIn$.next(false);
        return false;
      }
      this.isSignedIn$.next(true);
      return true;
    }
    this.isSignedIn$.next(false);
    return false;
  }
  isTokenExpired(exp: number): boolean {
    if (new Date(exp * 1000) < new Date()) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  }
  private parseJwt(token: string | null): any {
    if (!token) {
      return null;
    }
    try {
      const base64Payload = token.split('.')[1];
      return JSON.parse(atob(base64Payload));
    } catch (e) {
      return null;
    }
  }
}
