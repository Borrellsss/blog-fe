import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";

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
    this.setValidations();
    this.sub = this.router.events.subscribe((event: any) => {
      this.isActive = event["routerEvent"]?.url !== "/validations";
      if (event instanceof NavigationEnd) {
        this.setValidations();
      }
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private setValidations() {
    this.validations = new Map();
    this.forms.forEach((form) => {
      this.validationsService.readByFieldStartsWith(form.constructor.name.replace("Form", ""))
        .subscribe((res: Array<ValidationOutputDto>) => {
          this.validations.set(form.constructor.name, res);
          this.setValidatedFields(form.constructor.name);
        });
    });
  }
  private setValidatedFields(formName: string) {
    document.getElementById(`${formName}`)?.childNodes[1].childNodes.forEach((child) => {
      if (child.nodeName !== "DIV") {
        return;
      }
      this.renderer.removeClass(child, "validated");
      this.validations.get(formName)?.forEach((validation) => {
        if (validation.field.split(".")[1] === child.firstChild?.textContent) {
          this.renderer.addClass(child, "validated");
        }
        this.setIcons(child as Element);
      });
    });
  }
  private setIcons(el: Element): void {
    if (el.classList?.contains("validated")) {
      this.renderer.removeClass(el.childNodes[1], "fa-triangle-exclamation");
      this.renderer.addClass(el.childNodes[1], "fa-check");
    } else {
      this.renderer.removeClass(el.childNodes[1], "fa-check");
      this.renderer.addClass(el.childNodes[1], "fa-triangle-exclamation");
    }
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

