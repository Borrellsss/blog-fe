import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { take, timer } from "rxjs";

import { AuthService } from "../../services/utils/auth.service";
import { ValidatorService } from "../../services/utils/validator.service";
import { UsersService } from "../../services/users.service";
import { ValidationsService } from "../../services/validations.service";
import { SignUpInputDto } from "../../../shared/models/input/sign-up-input-dto";
import { SignUpOutputDto } from "../../../shared/models/output/users/sign-up-output-dto";
import { ValidationOutputDto } from "../../../shared/models/output/validations/validation-output-dto";
import ToastError from "../../../shared/toasts/toast-error";
import ToastSuccess from "../../../shared/toasts/toast-success";
import ToastWarning from "../../../shared/toasts/toast-warning";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  prefix: string = "SignUpInputDto";
  signUpForm: FormGroup = new FormGroup({});
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
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      birthdate: new FormControl(null),
      email: new FormControl(null),
      username: new FormControl(null),
      password: new FormControl(null),
      avatar: new FormControl(null),
      notifications: new FormControl(false),
    });
  }

  private reset() {
    this.validationsService.readByFieldStartsWith(this.prefix)
      .subscribe({
        next: (res: Array<ValidationOutputDto>) =>
          this.formValidatorService.validations = res,
        error: (err) => {
          // console.error(err);
        }
      });
    this.errors.clear();
    this.signUpForm.markAsPristine();
  }
  signUp(): void {
    this.reset();
    const signUpInputDto: SignUpInputDto = this.signUpForm.value;
    timer(100).pipe(take(1)).subscribe(() => {
      this.formValidatorService.validate(signUpInputDto, this.prefix);
      if (this.formValidatorService.errors.size > 0) {
        this.formValidatorService.errors
          .forEach((value, key) =>
            this.errors.set(key, value.map(errorMessage => errorMessage.message)));
        ToastWarning.fire({
          text: "Please check the form for errors",
        });
        return;
      }
      this.userService.signUp(signUpInputDto)
        .subscribe({
          next: (res: SignUpOutputDto) => {
            this.authService.onSignUp(res);
            this.router.navigate(['/sign-in']);
            ToastSuccess.fire({
              text: "You have successfully signed up",
            });
            this.signUpForm.reset();
          },
          error: (err) => {
            ToastError.fire({
              text: err.status === 500 ? "Internal server error" : err.error.message
            });
            // console.error(err);
          }
        });
    });
  }
}
