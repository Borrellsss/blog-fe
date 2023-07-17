import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./core/views/sign-in/sign-in.component";
import { SignUpComponent } from "./core/views/sign-up/sign-up.component";
import { authGuard } from "./core/guards/auth.guard";
import { HomeComponent } from "./core/views/home/home.component";
import { WelcomeComponent } from "./core/views/welcome/welcome.component";
import { NotFoundComponent } from "./core/views/not-found/not-found.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "users",
        loadChildren: () => import("./features/users/users.module")
          .then(module => module.UsersModule)
      },
      {
        path: "tags",
        loadChildren: () => import("./features/tags/tags.module")
          .then(module => module.TagsModule)
      },
      {
        path: "validations",
        loadChildren: () => import("./features/validations/validations.module")
          .then(module => module.ValidationsModule)
      },
    ]
  },
  {
    path: "welcome",
    component: WelcomeComponent
  },
  {
    path: "sign-up",
    component: SignUpComponent,
  },
  {
    path: "sign-in",
    component: SignInComponent
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
