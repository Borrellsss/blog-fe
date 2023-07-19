import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { PostListComponent } from "./components/post-list/post-list.component";
import { PostsRoutingModule } from "./posts-routing.module";

@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    SharedModule,
    PostsRoutingModule
  ],
  exports: [
    PostListComponent
  ]
})
export class PostsModule {
}
