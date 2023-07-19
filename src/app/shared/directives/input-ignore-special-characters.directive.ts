import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputIgnoreSpecialCharacters]'
})
export class InputIgnoreSpecialCharactersDirective {
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (+event.key >= 0 && +event.key <= 9) {
      return;
    }
    if (!event.key.match(/[^a-zA-Z\s]/)) {
      return;
    }
    event.preventDefault();
  }
}
