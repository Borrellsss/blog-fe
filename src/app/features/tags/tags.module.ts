import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";
import { TagListComponent } from "./components/tag-list/tag-list.component";
import { TagsRoutingModule } from "./tags-routing.module";

@NgModule({
  declarations: [
    TagListComponent
  ],
  imports: [
    SharedModule,
    TagsRoutingModule,
  ]
})
export class TagsModule { }
