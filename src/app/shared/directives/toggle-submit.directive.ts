import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleSubmit]'
})
export class ToggleSubmitDirective {
  @HostListener("submit") onSubmit(): void {
    this.preventSubmitIfFormInvalid();
  }
  @HostListener("input") onInput(): void {
    this.preventSubmitIfFormInvalid();
  }

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  private preventSubmitIfFormInvalid(): void {
    setTimeout(() => {
      const invalidInputs = this.el.nativeElement.querySelectorAll("input.invalid");
      const submitButton = this.el.nativeElement.querySelector("button[type='submit']");
      invalidInputs.length > 0 ? this.renderer.setAttribute(submitButton, "disabled", "true") :
        this.renderer.removeAttribute(submitButton, "disabled");
    }, 0);
  }
}
