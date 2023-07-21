import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { PostListComponent } from "./components/post-list/post-list.component";
import { PostsRoutingModule } from "./posts-routing.module";

import {
  RichTextEditorModule,
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
  TableService,
  QuickToolbarService,
} from "@syncfusion/ej2-angular-richtexteditor";
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostPendingComponent } from './components/post-pending/post-pending.component';

@NgModule({
  declarations: [
    PostListComponent,
    PostFormComponent,
    PostDetailsComponent,
    PostPendingComponent
  ],
  imports: [
    SharedModule,
    PostsRoutingModule,
    RichTextEditorModule,
  ],
  providers: [
    ToolbarService,
    LinkService,
    ImageService,
    HtmlEditorService,
    TableService,
    QuickToolbarService
  ],
  exports: [
    PostListComponent,
    PostFormComponent
  ]
})
export class PostsModule {
}
