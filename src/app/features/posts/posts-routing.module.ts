import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { PostFormComponent } from "./components/post-form/post-form.component";
import { PostListComponent } from "./components/post-list/post-list.component";
import { PostPendingComponent } from "./components/post-pending/post-pending.component";

const routes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'details/:userId/:id/:title',
    component: PostDetailsComponent
  },
  {
    path: 'edit',
    component: PostFormComponent
  },
  {
    path: 'pending',
    component: PostPendingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {

}
