import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputLabelAnimation]'
})
export class InputLabelAnimationDirective implements OnInit {
  @HostListener("change") onChange() {
    this.activate();
  }

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.activate();
  }

  public activate(): void {
    const input = this.el.nativeElement;
    const label = this.el.nativeElement.parentElement.children[1];
    if (input.value || input.type === "date") {
      this.renderer.addClass(label, "active");
    } else {
      this.renderer.removeClass(label, "active");
    }
  }
}
