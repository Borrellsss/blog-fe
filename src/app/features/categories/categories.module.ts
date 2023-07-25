import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoryListComponent } from './components/category-list/category-list.component';

@NgModule({
  declarations: [
    CategoryListComponent
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule,
  ]
})
export class CategoriesModule { }
