import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { PostFormComponent } from "./components/post-form/post-form.component";
import { MostPopularComponent } from "./components/post-list/most-popular/most-popular.component";
import { MostUpVotedComponent } from "./components/post-list/most-up-voted/most-up-voted.component";
import { PostListComponent } from "./components/post-list/post-list.component";
import { PostPendingComponent } from "./components/post-list/post-pending/post-pending.component";

const routes: Routes = [
  {
    path: "",
    component: PostListComponent
  },
  {
    path: "most-popular",
    component: MostPopularComponent
  },
  {
    path: "most-up-voted",
    component: MostUpVotedComponent
  },
  {
    path: "details/:userId/:id/:title",
    component: PostDetailsComponent
  },
  {
    path: "edit",
    component: PostFormComponent
  },
  {
    path: "pending",
    component: PostPendingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {

}
