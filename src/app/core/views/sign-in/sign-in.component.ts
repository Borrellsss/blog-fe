import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { take, timer } from "rxjs";

import { AuthService } from "../../services/utils/auth.service";
import { ValidatorService } from "../../services/utils/validator.service";
import { UsersService } from "../../services/users.service";
import { ValidationsService } from "../../services/validations.service";
import { SignInInputDto } from "../../../shared/models/input/sign-in-input-dto";
import { SignInOutputDto } from "../../../shared/models/output/users/sign-in-output-dto";
import { ValidationOutputDto } from "../../../shared/models/output/validations/validation-output-dto";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  prefix: string = "SignInInputDto";
  signInForm: FormGroup = new FormGroup({});
  errors: Map<string, Array<string>> = new Map();
  passwordVisible: boolean = false;

  constructor(
    private userService: UsersService,
    private validationsService: ValidationsService,
    private formValidatorService: ValidatorService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.reset();
    this.signInForm = new FormGroup({
      username: new FormControl(localStorage.getItem('user')),
      password: new FormControl(null)
    });
  }

  private reset() {
    this.validationsService.readByFieldStartsWith(this.prefix)
      .subscribe({
        next: (res: Array<ValidationOutputDto>) =>
          this.formValidatorService.validations = res,
        error: (err) => console.error(err)
      });
    this.errors.clear();
    this.signInForm.markAsPristine();
  }
  signIn(): void {
    this.reset();
    const signInInputDto: SignInInputDto = this.signInForm.value;
    timer(100).pipe(take(1)).subscribe(() => {
      this.formValidatorService.validate(signInInputDto, this.prefix);
      if (this.formValidatorService.errors.size > 0) {
        this.formValidatorService.errors
          .forEach((value, key) =>
            this.errors.set(key, value.map(errorMessage => errorMessage.message)));
        return;
      }
      this.userService.signIn(signInInputDto)
        .subscribe({
          next: (res: SignInOutputDto) => {
            this.authService.onSignIn(res);
            this.router.navigate(['/']);
          },
          error: (err) => console.error(err)
        });
      this.signInForm.reset();
    });
  }
}
