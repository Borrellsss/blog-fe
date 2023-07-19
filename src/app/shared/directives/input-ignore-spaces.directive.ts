import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputIgnoreSpaces]'
})
export class InputIgnoreSpacesDirective {
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (event.key === " ") {
      event.preventDefault();
    }
  }
}
