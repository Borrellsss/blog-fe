import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommentsService } from "../../../../core/services/comments.service";
import { PostsService } from "../../../../core/services/posts.service";
import { UsersService } from "../../../../core/services/users.service";
import { AuthService } from "../../../../core/services/utils/auth.service";
import { UserInputDto } from "../../../../shared/models/input/user-input-dto";
import { CommentPageableOutputDto } from "../../../../shared/models/output/posts/comment-pageable-output-dto";
import { PostPageableOutputDto } from "../../../../shared/models/output/posts/post-pageable-output-dto";
import { UserOutputDto } from "../../../../shared/models/output/users/user-output-dto";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: UserOutputDto | null = null;
  postPageableOutputDto: PostPageableOutputDto | null = null;
  postPage: number = 0;
  commentPageableOutputDto: CommentPageableOutputDto | null = null;
  commentPage: number = 0;
  currentUser: UserOutputDto | null = null;

  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private commentsService: CommentsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params["userId"];
      this.usersService.readById(userId).subscribe({
        next: (res: UserOutputDto) => {
          this.user = res;
          this.readAllPostsByUserIdOrderByCreatedAtDesc(userId, this.postPage);
          this.readCommentsAllByUserIdOrderByCreatedAtDesc(userId, this.commentPage);
        },
        error: (err: any) => {
          this.router.navigate(['/users']);
          console.log(err);
        }
      });
      this.currentUser = this.authService.getUser();
    });
  }
  private readAllPostsByUserIdOrderByCreatedAtDesc(userId: number, page: number): void {
    this.postsService.readAllByUserIdOrderByCreatedAtDesc(userId, this.postPage)
      .subscribe({
        next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
        error: (err: any) => {
          this.postPageableOutputDto = null;
          console.log(err);
        }
      });
  }
  private readCommentsAllByUserIdOrderByCreatedAtDesc(userId: number, page: number): void {
    this.commentsService.readAllByUserIdOrderByCreatedAtDesc(userId, this.commentPage)
      .subscribe({
        next: (res: CommentPageableOutputDto) => this.commentPageableOutputDto = res,
        error: (err: any) => {
          this.commentPageableOutputDto = null;
          console.log(err);
        }
      });
  }
  previousPostPage(): void {
    this.readAllPostsByUserIdOrderByCreatedAtDesc(this.user?.id!, --this.postPage);
  }
  nextPostPage(): void {
    this.readAllPostsByUserIdOrderByCreatedAtDesc(this.user?.id!, ++this.postPage);
  }
  previousCommentPage(): void {
    this.readCommentsAllByUserIdOrderByCreatedAtDesc(this.user?.id!, --this.commentPage)
  }
  nextCommentPage(): void {
    this.readCommentsAllByUserIdOrderByCreatedAtDesc(this.user?.id!, ++this.commentPage)
  }
  delete(): void {
    if (!this.user || (this.user?.id !== this.currentUser?.id && this.currentUser?.role.authority === "ROLE_USER")) {
      return;
    }
    this.usersService.delete(this.user.id).subscribe({
      next: () => this.router.navigate(['/users']),
      error: (err: any) => console.log(err)
    });
  }
  blockOrUnblock(): void {
    if (!this.user || this.currentUser?.role.authority !== "ROLE_MODERATOR") {
      return;
    }
    this.usersService.blockOrUnblock(this.user.id).subscribe({
      next: () => this.user!.blocked = !this.user!.blocked,
      error: (err: any) => console.log(err)
    });
  }
}
