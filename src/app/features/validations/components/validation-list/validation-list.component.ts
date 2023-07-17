import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription, timer } from "rxjs";

import { ValidationsService } from "../../../../core/services/validations.service";
import { ValidationOutputDto } from "../../../../shared/models/output/validation/validation-output-dto";
import { CategoryForm } from "../../models/category-form.model";
import { RoleForm } from "../../models/role-form.model";
import { SignInForm } from "../../models/sign-in-form.model";
import { SignUpForm } from "../../models/sign-up-form.model";
import { TagForm } from "../../models/tag-form.model";
import { UserForm } from "../../models/user-form.model";

@Component({
  selector: 'app-validation-list',
  templateUrl: './validation-list.component.html',
  styleUrls: ['./validation-list.component.scss']
})
export class ValidationListComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  object = Object;
  forms: Array<any> = [
    new SignUpForm(),
    new SignInForm(),
    new UserForm(),
    new RoleForm(),
    new CategoryForm(),
    new TagForm()
  ];
  validations: Map<string, Array<ValidationOutputDto>> = new Map();
  isActive = true;

  constructor(
    private validationsService: ValidationsService,
    private renderer: Renderer2,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe((val: any) => {
      this.isActive = val["routerEvent"]?.url !== "/validations";
      const code = val["routerEvent"]?.url.split("?")[1]?.split("&")[0]?.split("=")[1];
      const deleted = val["routerEvent"]?.url.split("?")[1]?.split("&")[1]?.split("=")[1];
      if (code && deleted === "true") {
        this.validations.forEach((value, key) => {
          value.forEach((validation) => {
            if ((validation.code === code) && this.validations.has(key)) {
              let formName = "";
              let formField = "";
              this.validations.set(key, this.validations.get(key)!
                .filter((validation) => {
                  if (validation.code === code) {
                    formName = validation.field.split(".")[0]
                      .replace("InputDto", " Form");
                    formField = validation.field.split(".")[1];
                  }
                  return validation.code !== code;
                }));
              this.resetValidationField(formName, formField);
            }
          });
        });
      }
    });
    this.forms.forEach((form) => {
      this.validationsService.readByFieldStartsWith(form.constructor.name.replace("Form", ""))
        .subscribe((res: Array<ValidationOutputDto>) => {
          this.validations.set(form.constructor.name, res);
          timer(500).subscribe(() => {
            this.setValidatedFields();
            this.setIcons();
          });
        });
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private setValidatedFields() {
    document.querySelectorAll(".validation-card").forEach((field) => {
      const formName: string = field.childNodes[0].childNodes[0].textContent?.replace(" ", "")!;
      if (!this.validations.has(formName)) {
        return;
      }
      // @ts-ignore
      if (this.validations.get(formName).length > 0) {
        this.validations.get(formName)!.forEach((validation) => {
          field.childNodes[1].childNodes.forEach((child) => {
            const validationFieldSuffix = validation.field.split(".")[1];
            if (validationFieldSuffix === child.firstChild?.textContent) {
              this.renderer.addClass(child, "validated");
            }
          });
        });
      }
    });
  }
  private setIcons() {
    document.querySelectorAll(".validation-fields-wrapper")
      .forEach((el) => {
        el.childNodes.forEach((child, index,parent) => {
          if (parent.length - 1 === index) {
            return;
          }
          if ((child as Element).classList?.contains("validated")) {
            this.renderer.addClass(child.childNodes[1], "fa-check");
          } else {
            this.renderer.addClass(child.childNodes[1], "fa-triangle-exclamation");
          }
        });
      });
  }
  private resetValidationField(formName: string, formField: string): void {
    document.querySelectorAll(".validation-card")
      .forEach((parent) => {
        if (parent.firstChild?.textContent === formName) {
          parent.lastChild?.childNodes.forEach((child) => {
            if (child.firstChild?.textContent === formField) {
              this.renderer.removeClass(child, "validated");
              this.renderer.removeClass(child.childNodes[1], "fa-check");
              this.renderer.addClass(child.childNodes[1], "fa-triangle-exclamation");
            }
          });
        }
    });
  }
  showFields(event: MouseEvent): void {
    const active = document.querySelector(".validation-card.active") as HTMLElement;
    const target = event.target as HTMLElement;
    const targetChevron = target.closest(".validation-card")?.children[0].lastChild;
    if (target.closest(".validation-fields-wrapper")?.contains(target)) {
      return;
    }
    if (!active) {
      this.renderer.addClass(target.closest(".validation-card"), "active");
      this.renderer.addClass(targetChevron, "open");
    } else {
      const activeChevron = active.closest(".validation-card")?.children[0].lastChild;
      if (active === target.closest(".validation-card")) {
        this.renderer.removeClass(active, "active");
        this.renderer.removeClass(activeChevron, "open");
      } else {
        this.renderer.removeClass(active, "active");
        this.renderer.removeClass(activeChevron, "open");
        this.renderer.addClass(target.closest(".validation-card"), "active");
        this.renderer.addClass(targetChevron, "open");
      }
    }
  }
}

