import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { superAdminAndAdminGuard } from "./core/guards/super-admin-and-admin.guard";
import { SignInComponent } from "./core/views/sign-in/sign-in.component";
import { SignUpComponent } from "./core/views/sign-up/sign-up.component";
import { authGuard } from "./core/guards/auth.guard";
import { HomeComponent } from "./core/views/home/home.component";
import { WelcomeComponent } from "./core/views/welcome/welcome.component";
import { NotFoundComponent } from "./core/views/not-found/not-found.component";

const routes: Routes = [
  {
    path: "welcome",
    component: WelcomeComponent,
    canActivate: [authGuard],
    // runGuardsAndResolvers: 'always',
  },
  {
    path: "sign-up",
    component: SignUpComponent,
    canActivate: [authGuard],
    // runGuardsAndResolvers: 'always',
  },
  {
    path: "sign-in",
    component: SignInComponent,
    canActivate: [authGuard],
    // runGuardsAndResolvers: 'always',
  },
  {
    path: "",
    component: HomeComponent,
    canActivate: [authGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: "",
        loadChildren: () => import("./features/posts/posts.module")
          .then(module => module.PostsModule),
      },
      {
        path: "posts",
        loadChildren: () => import("./features/posts/posts.module")
          .then(module => module.PostsModule)
      },
      {
        path: "categories",
        loadChildren: () => import("./features/categories/categories.module")
          .then(module => module.CategoriesModule)
      },
      {
        path: "tags",
        loadChildren: () => import("./features/tags/tags.module")
          .then(module => module.TagsModule)
      },
      {
        path: "users",
        loadChildren: () => import("./features/users/users.module")
          .then(module => module.UsersModule)
      },
      {
        path: "validations",
        loadChildren: () => import("./features/validations/validations.module")
          .then(module => module.ValidationsModule),
        canActivate: [superAdminAndAdminGuard],
      },
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
