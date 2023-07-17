import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/utils/auth.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  isSignedIn: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isSignedIn = this.authService.isTokenValid();
  }
}
