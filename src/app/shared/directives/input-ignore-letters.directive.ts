import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputIgnoreLetters]'
})
export class InputIgnoreLettersDirective {
  invalidChars: Array<string> = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (this.invalidChars.includes(event.key.toLowerCase())) {
      event.preventDefault();
    }
  }
}
