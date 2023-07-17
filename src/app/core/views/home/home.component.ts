import { Component, OnInit } from '@angular/core';
import { RoleOutputDto } from "../../../shared/models/output/role/role-output-dto";
import { AuthService } from "../../services/utils/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userRole: RoleOutputDto | undefined;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userRole = this.authService.user?.role;
  }
}
