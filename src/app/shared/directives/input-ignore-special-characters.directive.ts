import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputIgnoreSpecialCharacters]'
})
export class InputIgnoreSpecialCharactersDirective {
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (event.key.match(/[^a-zA-Z0-9]/)) {
      event.preventDefault();
    }
  }
}
