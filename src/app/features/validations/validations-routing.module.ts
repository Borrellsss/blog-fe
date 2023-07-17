import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ValidationDetailsComponent } from "./components/validation-details/validation-details.component";
import { ValidationFormComponent } from "./components/valifation-form/validation-form.component";
import { ValidationListComponent } from "./components/validation-list/validation-list.component";

const routes: Routes = [
  {
    path: "",
    component: ValidationListComponent,
    children: [
      {
        path: ":form/:field",
        component: ValidationDetailsComponent
      },
      {
        path: "edit/:form/:field",
        component: ValidationFormComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidationsRoutingModule { }
