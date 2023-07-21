import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { PostsService } from "../../../../core/services/posts.service";
import { UsersService } from "../../../../core/services/users.service";
import { AuthService } from "../../../../core/services/utils/auth.service";
import { PostOutputDto } from "../../../../shared/models/output/posts/post-output-dto";
import { UserOutputDto } from "../../../../shared/models/output/users/user-output-dto";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: PostOutputDto | null = null;
  currentUser: UserOutputDto | null = null;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const userId = params['userId'];
      this.postsService.readById(id).subscribe({
        next: (res: PostOutputDto) => {
          this.post = res;
          this.currentUser = this.authService.getUser();
          document.getElementById('post-content')!.innerHTML = this.post?.content;
          document.querySelectorAll("img").forEach((img) => {
            img.src = atob(img.src);
          });
        },
        error: (err) => {
          this.router.navigate(['/posts']);
          console.log(err);
        }
      });
    });
  }

  addOrRemoveUpVote(): void {
    const vote = {

    }
  }

  addOrRemoveDownVote(): void {

  }
}
