import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputIgnoreNumbers]'
})
export class InputIgnoreNumbersDirective {
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (event.key >= "0" && event.key <= "9") {
      event.preventDefault();
    }
  }
}
