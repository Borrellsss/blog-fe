import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { UserListComponent } from "./components/user-list/user-list.component";

const routes: Routes = [
  {
    path: "",
    component: UserListComponent
  },
  {
    path: "details/:userId/:username",
    component: UserDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
