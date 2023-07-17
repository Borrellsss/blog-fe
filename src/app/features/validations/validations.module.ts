import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { ValidationsRoutingModule } from "./validations-routing.module";
import { ValidationListComponent } from './components/validation-list/validation-list.component';
import { ValidationFormComponent } from './components/valifation-form/validation-form.component';
import { ValidationDetailsComponent } from './components/validation-details/validation-details.component';



@NgModule({
  declarations: [
    ValidationListComponent,
    ValidationFormComponent,
    ValidationDetailsComponent
  ],
  imports: [
    SharedModule,
    ValidationsRoutingModule
  ],
  exports: [
    ValidationListComponent
  ]
})
export class ValidationsModule { }
