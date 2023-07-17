import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ErrorMessagesService } from "../../../../core/services/error-messages.service";
import { UsersService } from "../../../../core/services/users.service";
import { ValidationsService } from "../../../../core/services/validations.service";
import { UserOutputDto } from "../../../../shared/models/output/user/user-output-dto";
import { ValidationOutputDto } from "../../../../shared/models/output/validation/validation-output-dto";

@Component({
  selector: 'app-validation-details',
  templateUrl: './validation-details.component.html',
  styleUrls: ['./validation-details.component.scss']
})
export class ValidationDetailsComponent implements OnInit {
  validation: ValidationOutputDto | null = null;
  formField: string = "";

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
          },
          error: (err) => {
            this.validation = null;
            // console.log(err);
          }
        });
    });
  }

  private setCreatedByAndUpdatedBy(target: any, id: number, field: string) {
    this.userService.readById(id).subscribe({
      next: (res: UserOutputDto) => {
        target[field] = `${res.username} (${res.role.authority.replace("ROLE_", "").replace("_", " ")})`;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  showErrorMessages(event: MouseEvent): void {
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
  deleteValidation(code: string): void {
    this.validationsService.delete(code)
      .subscribe({
        next: (res) => {
          this.validation = null;
          this.router.navigate(
            ["/validations"],
            {
              queryParams: {
                code: code,
                deleted: true
              }
            }
          );
        },
        error: (err) => console.log(err)
      });
  }
  deleteErrorMessage(id: number): void {
    console.log(this.validation?.errorMessages
      .splice(this.validation?.errorMessages.findIndex((errorMessage) =>
        errorMessage.id === id), 1));
    this.errorMessagesService.delete(id)
      .subscribe({
        next: (res) => {
          // @ts-ignore
          this.validation.errorMessages = this.validation?.errorMessages
            .filter((errorMessage) => errorMessage.id !== id).slice();
        },
        error: (err) => console.log(err)
      });
  }
}
