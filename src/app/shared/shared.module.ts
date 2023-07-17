import { CommonModule, NgOptimizedImage } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { InputLabelAnimationDirective } from './directives/input-label-animation.directive';
import { InputIgnoreNumbersDirective } from './directives/input-ignore-numbers.directive';
import { InputIgnoreLettersDirective } from './directives/input-ignore-letters.directive';
import { InputIgnoreSpecialCharactersDirective } from './directives/input-ignore-special-characters.directive';
import { ToggleSubmitDirective } from './directives/toggle-submit.directive';

@NgModule({
  declarations: [
    InputLabelAnimationDirective,
    InputIgnoreNumbersDirective,
    InputIgnoreLettersDirective,
    InputIgnoreSpecialCharactersDirective,
    ToggleSubmitDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  providers: [
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    InputLabelAnimationDirective,
    InputIgnoreNumbersDirective,
    InputIgnoreLettersDirective,
    InputIgnoreSpecialCharactersDirective,
    ToggleSubmitDirective
  ]
})
export class SharedModule {

}
