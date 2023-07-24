import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

import { UsersService } from "../../../../core/services/users.service";
import { UserPageableOutputDto } from "../../../../shared/models/output/users/user-pageable-output-dto";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userPageableOutputDto: UserPageableOutputDto | null = null;
  page: number = 0;
  userListForm: FormGroup = new FormGroup({});
  private isFilterActive: boolean = false;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.readAllByOrderByUsername(this.page);
    this.userListForm = new FormGroup({
      username: new FormControl(null)
    });
  }

  private readAllByOrderByUsername(page: number) {
    this.usersService.readAllByDeletedIsFalseOrderByUsername(page).subscribe({
      next: (res: UserPageableOutputDto) => this.userPageableOutputDto = res,
      error: (err) => {
        // console.log(err);
      }
    });
  }
  readAllByUsernameContainsOrderByUsername(username: string, page: number): void {
    this.usersService.readAllByUsernameContainingAndDeletedIsFalseOrderByUsername(username, page).subscribe({
      next: (res: UserPageableOutputDto) => this.userPageableOutputDto = res,
      error: (err) => {
        this.userPageableOutputDto = null;
        // console.log(err);
      }
    });
  }
  filterTags(): void {
    const username = this.userListForm.controls["username"].value;
    console.log(username)
    this.page = 0;
    if (!username) {
      this.isFilterActive = false;
      this.readAllByOrderByUsername(this.page);
    } else {
      this.isFilterActive = true;
      this.readAllByUsernameContainsOrderByUsername(username, this.page);
    }
  }
  nextPage(): void {
    if (!this.isFilterActive) {
      this.readAllByOrderByUsername(++this.page);
    } else {
      this.readAllByUsernameContainsOrderByUsername(this.userListForm.controls["username"].value, ++this.page);
    }
  }
  previousPage(): void {
    if (!this.isFilterActive) {
      this.readAllByOrderByUsername(--this.page);
    } else {
      this.readAllByUsernameContainsOrderByUsername(this.userListForm.controls["username"].value, --this.page);
    }
  }
}
