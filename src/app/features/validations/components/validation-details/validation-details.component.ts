import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { ErrorMessagesService } from "../../../../core/services/error-messages.service";
import { UsersService } from "../../../../core/services/users.service";
import { ValidationsService } from "../../../../core/services/validations.service";
import { ErrorMessageInputDto } from "../../../../shared/models/input/error-message-input-dto";
import { UserOutputDto } from "../../../../shared/models/output/user/user-output-dto";
import { ErrorMessageOutputDto } from "../../../../shared/models/output/validation/error-message-output-dto";
import { ValidationOutputDto } from "../../../../shared/models/output/validation/validation-output-dto";

@Component({
  selector: 'app-validation-details',
  templateUrl: './validation-details.component.html',
  styleUrls: ['./validation-details.component.scss']
})
export class ValidationDetailsComponent implements OnInit {
  validation: ValidationOutputDto | null = null;
  formField: string = "";
  errorMessageForm: FormGroup = new FormGroup({});
  editErrorMessageForm: FormGroup = new FormGroup({});
  currentActiveEditFormId: number | null = null;

  constructor(
    private validationsService: ValidationsService,
    private errorMessagesService: ErrorMessagesService,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.formField = `${params["form"]} Form ${params["field"]}`;
      this.validationsService.readByField(`${params["form"]}InputDto.${params["field"]}`)
        .subscribe({
          next: (res: ValidationOutputDto) => {
            this.validation = res;
            this.setCreatedByAndUpdatedBy(this.validation, this.validation.createdBy, "createdBy");
            this.setCreatedByAndUpdatedBy(this.validation, this.validation.createdBy, "updatedBy");
            this.validation.errorMessages.forEach((errorMessage) => {
              this.setCreatedByAndUpdatedBy(errorMessage, errorMessage.createdBy, "createdBy");
              this.setCreatedByAndUpdatedBy(errorMessage, errorMessage.updatedBy, "updatedBy");
            });
            this.disableRadioButton();
            const addValidationErrorMessageWrapper = (document.querySelector(".add-validation-error-message-wrapper")?.lastChild as Element);
            if (addValidationErrorMessageWrapper) {
              this.renderer.removeClass(addValidationErrorMessageWrapper, "active");
              this.resetAddValidationErrorMessageWrapper();
            }
            this.currentActiveEditFormId = null;
          },
          error: (err) => {
            this.validation = null;
            console.log(err);
          }
        });
    });
    this.errorMessageForm = new FormGroup({
      newErrorMessage: new FormControl(null),
      errorType: new FormControl(null)
    });
    this.editErrorMessageForm = new FormGroup({
      editErrorMessage: new FormControl(null),
    });
  }

  private setCreatedByAndUpdatedBy(target: any, id: number, field: string) {
    this.userService.readById(id).subscribe({
      next: (res: UserOutputDto) => {
        target[field] = res.username;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  showErrorMessages(event: MouseEvent): void {
    this.disableRadioButton();
    this.resetAddValidationErrorMessageWrapper();
    const target = (event.target as HTMLElement);
    const validationErrorMessagesWrapper = target.closest(".validation-error-messages-wrapper");
    const targetChevron = validationErrorMessagesWrapper?.children[0].lastChild;
    if (target.closest(".validation-error-messages")?.contains(target) || !validationErrorMessagesWrapper) {
      return;
    }
    if (validationErrorMessagesWrapper.classList.contains("active")) {
      this.renderer.removeClass(validationErrorMessagesWrapper, "active");
      this.renderer.removeClass(targetChevron, "open");
    } else {
      this.renderer.addClass(validationErrorMessagesWrapper, "active");
      this.renderer.addClass(targetChevron, "open");
    }
  }
  clearForm(form: FormGroup): void {
    form.reset();
  }
  deleteValidation(code: string): void {
    this.validationsService.delete(code)
      .subscribe({
        next: (res) => {
          this.validation = null;
          this.router.navigate(["/validations"]);
        },
        error: (err) => console.log(err)
      });
  }
  deleteErrorMessage(id: number): void {
    this.errorMessagesService.delete(id)
      .subscribe({
        next: (res) => {
          // @ts-ignore
          this.validation.errorMessages = this.validation?.errorMessages
            .filter((errorMessage) => errorMessage.id !== id).slice();
          this.disableRadioButton();
          this.resetAddValidationErrorMessageWrapper();
        },
        error: (err) => console.log(err)
      });
  }
  private isErrorMessagePresent(errorType: string): boolean {
    // @ts-ignore
    return this.validation.errorMessages.filter((errorMessage) =>
      errorMessage.errorType.split(".")[2] === errorType).length > 0;
  }
  private disableRadioButton(): void {
    const radioGroup = document.querySelector(".radio-group");
    if (!radioGroup) {
      return;
    }
    radioGroup.childNodes.forEach((radio) => {
      const radioEl = radio.firstChild as HTMLInputElement;
      switch (radioEl.value) {
        case "notNull":
          radioEl.disabled = !this.validation?.notNull ||
            this.isErrorMessagePresent("notNull");
          break;
        case "notEmpty":
          radioEl.disabled = !this.validation?.notEmpty ||
            this.isErrorMessagePresent("notEmpty");
          break;
        case "min":
          radioEl.disabled = this.validation?.min === null ||
            this.isErrorMessagePresent("min");
          break;
        case "max":
          radioEl.disabled = this.validation?.max === null ||
            this.isErrorMessagePresent("max");
          break;
        case "regex":
          radioEl.disabled = this.validation?.regex === null ||
            this.isErrorMessagePresent("regex");
          break;
        case "minUpperCaseLetters":
          radioEl.disabled = this.validation?.minUpperCaseLetters === null ||
            this.isErrorMessagePresent("minUpperCaseLetters");
          break;
        case "minLowerCaseLetters":
          radioEl.disabled = this.validation?.minLowerCaseLetters === null ||
            this.isErrorMessagePresent("minLowerCaseLetters");
          break;
        case "minDigits":
          radioEl.disabled = this.validation?.minDigits === null ||
            this.isErrorMessagePresent("minDigits");
          break;
        case "minSpecialCharacters":
          radioEl.disabled = this.validation?.minSpecialCharacters === null ||
            this.isErrorMessagePresent("minSpecialCharacters");
          break;
        default:
          console.log("Error");
          return;
      }
      radioEl.disabled ? this.renderer.addClass(radioEl, "disabled") : this.renderer.removeClass(radioEl, "disabled");
    });
  }
  checkDisabledRadioButton(): boolean {
    return document.querySelectorAll(".custom-radio-wrapper > input[type='radio'].disabled").length === 9;
  }
  private resetAddValidationErrorMessageWrapper() {
    if (this.checkDisabledRadioButton()) {
      this.renderer.addClass(document.querySelector(".add-validation-error-message-wrapper"), "disabled");
    } else {
      this.renderer.removeClass(document.querySelector(".add-validation-error-message-wrapper"), "disabled");
    }
  }
  showErrorMessageForm(event: MouseEvent) {
    if (this.currentActiveEditFormId) {
      const editValidationErrorMessage = document.getElementById(`edit-form-${this.currentActiveEditFormId}`);
      this.renderer.removeClass(editValidationErrorMessage, "active");
      this.currentActiveEditFormId = null;
    }
    const target = (event.target as HTMLElement);
    const newValidationErrorMessage = target.closest(".add-validation-error-message-wrapper")?.lastChild;
    if (this.checkDisabledRadioButton()) {
      return;
    }
    if ((newValidationErrorMessage as HTMLElement).classList.contains("active")) {
      this.renderer.removeClass(newValidationErrorMessage, "active");
      this.clearForm(this.errorMessageForm);
    } else {
      this.renderer.addClass(newValidationErrorMessage, "active");
    }
  }
  showEditErrorMessageForm(id: number): void {
    if (this.currentActiveEditFormId && (this.currentActiveEditFormId !== id)) {
      this.renderer.removeClass(document.getElementById(`edit-form-${this.currentActiveEditFormId}`), "active");
    }
    const editValidationErrorMessage = document.getElementById(`edit-form-${id}`);
    if (!editValidationErrorMessage) {
      return;
    }
    if (editValidationErrorMessage.classList.contains("active")) {
      this.renderer.removeClass(editValidationErrorMessage, "active");
      this.currentActiveEditFormId = null;
      this.clearForm(this.editErrorMessageForm);
    } else {
      this.renderer.addClass(editValidationErrorMessage, "active");
      this.renderer.addClass(document.getElementById(`edit-input-label-${id}`), "active");
      this.currentActiveEditFormId = id;
      const errorMessage = this.validation?.errorMessages
        .filter((errorMessage) => errorMessage.id === id)[0];
      this.editErrorMessageForm.controls["editErrorMessage"].setValue(errorMessage?.message);
    }
  }
  createErrorMessage(): void {
    this.errorMessageForm.markAsPristine();
    for (const control in this.errorMessageForm.controls) {
      if (this.errorMessageForm.controls[control].value === null || this.errorMessageForm.controls[control].value === "") {
        this.errorMessageForm.controls[control].setErrors({required: true});
      }
    }
    if (this.errorMessageForm.invalid) {
      return;
    }
    const errorType = `${this.validation?.field}.${this.errorMessageForm.controls["errorType"].value}`;
    const errorMessageInputDto: ErrorMessageInputDto = {
      errorType: errorType,
      message: this.errorMessageForm.controls["newErrorMessage"].value,
      validationCode: this.validation?.code!
    }
    this.errorMessagesService.create(errorMessageInputDto).subscribe({
      next: (res) => {
        this.validation?.errorMessages.push(res);
        this.validation?.errorMessages.forEach((errorMessage) => {
          this.setCreatedByAndUpdatedBy(errorMessage, errorMessage.createdBy, "createdBy");
          this.setCreatedByAndUpdatedBy(errorMessage, errorMessage.updatedBy, "updatedBy");
        });
        this.disableRadioButton();
        const addValidationErrorMessageWrapper = (document.querySelector(".add-validation-error-message-wrapper")?.lastChild as Element);
        if (!addValidationErrorMessageWrapper) {
          return;
        }
        if (this.checkDisabledRadioButton()) {
          this.renderer.removeClass(addValidationErrorMessageWrapper, "active");
          this.resetAddValidationErrorMessageWrapper();
        }
      }
    });
    this.clearForm(this.errorMessageForm);
  }
  updateErrorMessage(errorMessage: ErrorMessageOutputDto): void {
    this.editErrorMessageForm.markAsPristine();
    if (this.editErrorMessageForm.controls["editErrorMessage"].value === null || this.editErrorMessageForm.controls["editErrorMessage"].value === "") {
      this.editErrorMessageForm.controls["editErrorMessage"].setErrors({required: true});
    }
    if (this.editErrorMessageForm.invalid || !errorMessage) {
      return;
    }
    const errorMessageInputDto: ErrorMessageInputDto = {
      errorType: errorMessage.errorType,
      message: this.editErrorMessageForm.controls["editErrorMessage"].value,
      validationCode: this.validation?.code!
    }
    this.errorMessagesService.update(errorMessage.id, errorMessageInputDto).subscribe({
      next: (res) => {
        this.validation?.errorMessages.forEach((errorMessage) => {
          if (errorMessage.id === res.id) {
            errorMessage.message = res.message;
            this.setCreatedByAndUpdatedBy(errorMessage, res.updatedBy, "updatedBy");
            errorMessage.updatedAt = res.updatedAt;
          }
        });
        const editValidationErrorMessage = document.getElementById(`edit-form-${errorMessage.id}`);
        if (!editValidationErrorMessage) {
          return;
        }
        this.renderer.removeClass(editValidationErrorMessage, "active");
      }
    });
    this.clearForm(this.editErrorMessageForm);
  }
}
