import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";

const routes: Routes = [
  {
    path: "sign-up",
    component: SignUpComponent
  },
  {
    path: "sign-in",
    component: SignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {

}
