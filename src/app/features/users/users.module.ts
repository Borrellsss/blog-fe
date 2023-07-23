import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";
import { UsersRoutingModule } from "./users-routing.module";
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
  ]
})
export class UsersModule {

}
