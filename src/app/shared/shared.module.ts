import { CommonModule, NgOptimizedImage } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { InputLabelAnimationDirective } from './directives/input-label-animation.directive';
import { InputIgnoreNumbersDirective } from './directives/input-ignore-numbers.directive';
import { InputIgnoreLettersDirective } from './directives/input-ignore-letters.directive';
import { InputIgnoreSpecialCharactersDirective } from './directives/input-ignore-special-characters.directive';
import { ToggleSubmitDirective } from './directives/toggle-submit.directive';
import { InputIgnoreSpacesDirective } from './directives/input-ignore-spaces.directive';
import { StrReplacePipe } from './pipes/str-replace.pipe';
import { UserRoleConverterPipe } from './pipes/user-role-converter.pipe';

@NgModule({
  declarations: [
    InputLabelAnimationDirective,
    InputIgnoreNumbersDirective,
    InputIgnoreLettersDirective,
    InputIgnoreSpecialCharactersDirective,
    ToggleSubmitDirective,
    InputIgnoreSpacesDirective,
    StrReplacePipe,
    UserRoleConverterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgOptimizedImage,
  ],
  providers: [
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgOptimizedImage,
    InputLabelAnimationDirective,
    InputIgnoreNumbersDirective,
    InputIgnoreLettersDirective,
    InputIgnoreSpecialCharactersDirective,
    ToggleSubmitDirective,
    InputIgnoreSpacesDirective,
    StrReplacePipe,
    UserRoleConverterPipe
  ]
})
export class SharedModule {

}
