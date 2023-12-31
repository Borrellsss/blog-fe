import { Injectable } from '@angular/core';

import { ErrorMessageOutputDto } from "../../../shared/models/output/validations/error-message-output-dto";
import { ValidationOutputDto } from "../../../shared/models/output/validations/validation-output-dto";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  validations: Array<ValidationOutputDto> = [];
  errors: Map<string, Array<ErrorMessageOutputDto>> = new Map();

  constructor() { }

  validate(inputDto: any, prefix: string): void {
    this.errors.clear();
    this.validations.forEach((validation: ValidationOutputDto) => {
      const suffix = validation.field.replace(`${prefix}.`, "");
      if (!Object.hasOwn(inputDto, suffix)) {
        return;
      }
      const field = inputDto[suffix];
      if (field === null && validation.notNull) {
        this.validateNull(suffix, validation);
      }
      if (field && !isNaN(Date.parse(field))) {
        this.validateDate(suffix, validation, new Date(field));
        return;
      }
      if (typeof field === "number") {
        this.validateNumber(suffix, validation, field);
        return;
      }
      if (typeof field === "string") {
        this.validateString(suffix, validation, field);
        return;
      }
      if (field instanceof Array) {
        this.validateArray(suffix, validation, field);
        return;
      }
    });
  }
  // VALIDATION METHODS
  // NULL VALIDATION
  private validateNull(suffix: string, validation: ValidationOutputDto) {
    this.addErrors(suffix, validation, "notNull");
  }
  // STRING VALIDATION
  private validateString(suffix: string, validation: ValidationOutputDto, string: string) {
    if (validation.notEmpty && string === "") {
      this.addErrors(suffix, validation, "notEmpty");
    }
    if (validation.min && string.length < validation.min) {
      this.addErrors(suffix, validation, "min");
    }
    if (validation.max && string.length > validation.max) {
      this.addErrors(suffix, validation, "max");
    }
    if (validation.regex && !new RegExp(validation.regex).test(string) && string !== "") {
      this.addErrors(suffix, validation, "regex");
    }
    if (validation.minUpperCaseLetters && string.replace(/[^A-Z]/g, "").length < validation.minUpperCaseLetters) {
      this.addErrors(suffix, validation, "minUpperCaseLetters");
    }
    if (validation.minLowerCaseLetters && string.replace(/[^a-z]/g, "").length < validation.minLowerCaseLetters) {
      this.addErrors(suffix, validation, "minLowerCaseLetters");
    }
    if (validation.minDigits && string.replace(/[^0-9]/g, "").length < validation.minDigits) {
      this.addErrors(suffix, validation, "minDigits");
    }
    if (validation.minSpecialCharacters && string.replace(/[\w\s]/g, "").length < validation.minSpecialCharacters) {
      this.addErrors(suffix, validation, "minSpecialCharacters");
    }
  }
  // NUMBER VALIDATION
  private validateNumber(suffix: string, validation: ValidationOutputDto, number: number) {
    if (validation.min && number < validation.min) {
      this.addErrors(suffix, validation, "min");
    }
    if (validation.max && number > validation.max) {
      this.addErrors(suffix, validation, "max");
    }
  }
  // DATE VALIDATION
  private validateDate(suffix: string, validation: ValidationOutputDto, date: Date) {
    if (validation.min) {
      const today = new Date();
      if ((today.getFullYear() - date.getFullYear()) < validation.min) {
        this.addErrors(suffix, validation, "min");
      }
    }
  }
  // ARRAY VALIDATION
  private validateArray(suffix: string, validation: ValidationOutputDto, array: Array<any>) {
    if (validation.notEmpty && array.length === 0) {
      this.addErrors(suffix, validation, "notEmpty");
    }
    if (validation.min && array.length < validation.min) {
      this.addErrors(suffix, validation, "min");
    }
    if (validation.max && array.length > validation.max) {
      this.addErrors(suffix, validation, "max");
    }
  }
  private addErrors(key: string, validation: ValidationOutputDto, errorType: string): void {
    const errorMessageOutputDtos: Array<ErrorMessageOutputDto> = validation.errorMessages
      .filter(errorMessage => errorMessage.errorType === `${validation.field}.${errorType}`);
    if (errorMessageOutputDtos.length === 0) {
      errorMessageOutputDtos.push({
        id: 0,
        errorType: `${validation.field}.${errorType}`,
        message: this.setErrorMessagePlaceholder(key, validation, errorType),
        validationCode: "",
        createdBy: 0,
        updatedBy: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    if (!this.errors.has(key)) {
      this.errors.set(key, errorMessageOutputDtos)
    } else {
      this.errors.get(key)?.push(...validation.errorMessages
        .filter(errorMessage=> errorMessage.errorType === `${validation.field}.${errorType}`));
    }
  }
  private setErrorMessagePlaceholder(key: string, validation: ValidationOutputDto, errorType: string): string {
    switch (errorType) {
      case "notNull":
        return `Field is required`;
      case "notEmpty":
        return `Field cannot be empty`;
      case "min":
        return `Field must be greater than or equal to ${validation.min}`;
      case "max":
        return `Field must be less than or equal to ${validation.max}`;
      case "regex":
        return `Field must be in the correct format`;
      case "minUpperCaseLetters":
        return `Field must contain at least ${validation.minUpperCaseLetters} uppercase letters`;
      case "minLowerCaseLetters":
        return `Field must contain at least ${validation.minLowerCaseLetters} lowercase letters`;
      case "minDigits":
        return `Field must contain at least ${validation.minDigits} digits`;
      case "minSpecialCharacters":
        return `Field must contain at least ${validation.minSpecialCharacters} special characters`;
      default:
        return `Field is invalid`;
    }
  }
}
