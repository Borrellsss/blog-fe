import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

import { SignInOutputDto } from "../../../shared/models/output/user/sign-in-output-dto";
import { SignUpOutputDto } from "../../../shared/models/output/user/sign-up-output-dto";
import { UserOutputDto } from "../../../shared/models/output/user/user-output-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSignedIn$: Subject<boolean> = new Subject<boolean>();
  user: UserOutputDto | null = null;

  constructor() { }

  onSignUp(signUpOutputDto: SignUpOutputDto): void {
    this.onSignOut();
    localStorage.setItem("username", signUpOutputDto.username);
  }
  onSignIn(signInOutputDto: SignInOutputDto): void {
    if (localStorage.getItem("username")) {
      localStorage.removeItem("username");
    }
    localStorage.setItem("user", JSON.stringify(signInOutputDto));
    this.user = JSON.parse(this.parseJwt(signInOutputDto.jwt).user);
    this.isSignedIn$.next(true);
  }
  onSignOut(): void {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      this.user = null;
      this.isSignedIn$.next(false);
    }
  }
  isTokenValid(): boolean {
    if (localStorage.getItem("user")) {
      const token = JSON.parse(localStorage.getItem("user")!).jwt;
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
      localStorage.removeItem("user");
      return false;
    }
    return true;
  }
  private parseJwt(token: string): any {
    try {
      const base64Payload = token.split('.')[1];
      return JSON.parse(atob(base64Payload));
    } catch (e) {
      return null;
    }
  }
}
