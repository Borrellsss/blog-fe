import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./core/views/home/home.component";
import { NotFoundComponent } from "./core/views/not-found/not-found.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "users",
    loadChildren: () => import("./features/users/users.module")
      .then(module => module.UsersModule)
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
