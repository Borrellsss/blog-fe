import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UsersRoutingModule } from "./users-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    RouterModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UsersModule {

}
