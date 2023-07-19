import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ValidationsService } from "../../../../core/services/validations.service";
import { ValidationInputDto } from "../../../../shared/models/input/validation-input-dto";
import { ValidationOutputDto } from "../../../../shared/models/output/validation/validation-output-dto";

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.scss']
})
export class ValidationFormComponent implements OnInit {
  validation: ValidationOutputDto | null = null;
  formField: string = "";
  validationForm: FormGroup = new FormGroup({});

  constructor(
    private validationsService: ValidationsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.validationForm = new FormGroup({
      code: new FormControl(null),
      notNull: new FormControl(null),
      notEmpty: new FormControl(null),
      min: new FormControl(null),
      max: new FormControl(null),
      regex: new FormControl(null),
      minUpperCaseLetters: new FormControl(null),
      minLowerCaseLetters: new FormControl(null),
      minDigits: new FormControl(null),
      minSpecialCharacters: new FormControl(null),
    });
    this.route.params.subscribe(params => {
      this.formField = `${params["form"]} Form ${params["field"]}`;
      this.validationsService.readByField(`${params["form"]}InputDto.${params["field"]}`)
        .subscribe({
          next: (res: ValidationOutputDto) => {
            this.validation = res;
            for (const [key, value] of Object.entries(this.validation)) {
              if (this.validationForm.controls[key]) {
                if (value !== null) {
                  this.validationForm.controls[key].setValue(value);
                  document.querySelector(`input[formControlName="${key}"] ~ label`)?.classList.add("active");
                }
              }
            }
          },
          error: (err) => {
            console.log(err);
            this.validation = null;
          }
        });
    });
  }

  createOrUpdate(): void {
    this.validateForm();
    const validationInputDto: ValidationInputDto = {
      code: "",
      field: "",
      notNull: this.validationForm.controls["notNull"].value,
      notEmpty: this.validationForm.controls["notEmpty"].value,
      min: this.validationForm.controls["min"].value,
      max: this.validationForm.controls["max"].value,
      regex: this.validationForm.controls["regex"].value === "" ? null : this.validationForm.controls["regex"].value,
      minUpperCaseLetters: this.validationForm.controls["minUpperCaseLetters"].value,
      minLowerCaseLetters: this.validationForm.controls["minLowerCaseLetters"].value,
      minDigits: this.validationForm.controls["minDigits"].value,
      minSpecialCharacters: this.validationForm.controls["minSpecialCharacters"].value,
    };
    if (this.validationForm.invalid) {
      return;
    }
    if (this.validation) {
      validationInputDto.code = this.validation.code;
      validationInputDto.field = this.validation.field;
      this.validationsService.update(this.validation.code, validationInputDto)
        .subscribe({
          next: (res: ValidationOutputDto) =>
            this.router.navigate(["/validations",
              this.formField.split(" ")[0],
              this.formField.split(" ")[2]
            ]),
          error: (err) => console.log(err)
        });
    } else {
      validationInputDto.code = this.validationForm.controls["code"].value;
      validationInputDto.field = this.formField.replace(" Form ", "InputDto.");
      // @ts-ignore
      this.validationsService.create(validationInputDto)
        .subscribe({
          next: (res: ValidationOutputDto) =>
            this.router.navigate(["/validations",
              this.formField.split(" ")[0],
              this.formField.split(" ")[2]
            ]),
          error: (err) => console.log(err)
        });
    }
  }
  private validateForm(): void {
    if (!this.validationForm.controls["code"].value) {
      this.validationForm.controls["code"].setErrors({ required: true });
      document.getElementById("code")?.classList.add("invalid");
    } else if (this.validationForm.controls["code"].value.length !== 8) {
      this.validationForm.controls["code"].setErrors({ length: true });
      document.getElementById("code")?.classList.add("invalid");
    }
    if (this.validationForm.controls["notNull"].value === null) {
      this.validationForm.controls["notNull"].setValue(false);
    }
    if (this.validationForm.controls["notEmpty"].value === null) {
      this.validationForm.controls["notEmpty"].setValue(false);
    }
    if (this.validationForm.controls["min"].value === "") {
      this.validationForm.controls["min"].setValue(null);
    } else {
      this.validateFormFieldLessThan("min", 1);
    }
    if (this.validationForm.controls["max"].value === "") {
      this.validationForm.controls["max"].setValue(null);
    } else {
      this.validateFormFieldLessThan("max", 1);
    }
    if (this.validationForm.controls["regex"].value === "") {
      this.validationForm.controls["regex"].setValue(null);
    }
    if (this.validationForm.controls["minUpperCaseLetters"].value === "") {
      this.validationForm.controls["minUpperCaseLetters"].setValue(null);
    } else {
      this.validateFormFieldLessThan("minUpperCaseLetters", 1);
    }
    if (this.validationForm.controls["minLowerCaseLetters"].value === "") {
      this.validationForm.controls["minLowerCaseLetters"].setValue(null);
    } else {
      this.validateFormFieldLessThan("minLowerCaseLetters", 1);
    }
    if (this.validationForm.controls["minDigits"].value === "") {
      this.validationForm.controls["minDigits"].setValue(null);
    } else {
      this.validateFormFieldLessThan("minDigits", 1);
    }
    if (this.validationForm.controls["minSpecialCharacters"].value === "") {
      this.validationForm.controls["minSpecialCharacters"].setValue(null);
    } else {
      this.validateFormFieldLessThan("minSpecialCharacters", 1);
    }
  }
  private validateFormFieldLessThan(formControlName: string, number: number): void {
    if (!this.validationForm.controls[formControlName].value) {
      return;
    }
    if (this.validationForm.controls[formControlName].value < number) {
      this.validationForm.controls[formControlName].setErrors({ min: true });
      document.querySelector(`input[formControlName='${formControlName}']`)?.classList.add("invalid");
    }
  }
  clearForm(): void {
    this.validationForm.reset(
      {
        code: this.validationForm.controls["code"].value,
        notNull: false,
        notEmpty: false,
      });
  }
}
