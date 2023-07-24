import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../../services/utils/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private sub: Subscription = new Subscription();
  isSignedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.sub = this.authService.isSignedIn$.subscribe((res: boolean) => {
      this.isSignedIn = res;
    });
    this.authService.isTokenValid();
  }

  signOut(): void {
    this.authService.onSignOut();
    this.router.navigate(["/welcome"])
  }
}
