import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { CommentsService } from "../../../../core/services/comments.service";
import { PostsService } from "../../../../core/services/posts.service";
import { UsersService } from "../../../../core/services/users.service";
import { AuthService } from "../../../../core/services/utils/auth.service";
import { CommentPageableOutputDto } from "../../../../shared/models/output/posts/comment-pageable-output-dto";
import { PostPageableOutputDto } from "../../../../shared/models/output/posts/post-pageable-output-dto";
import { UserOutputDto } from "../../../../shared/models/output/users/user-output-dto";
import ToastError from "../../../../shared/toasts/toast-error";
import ToastSuccess from "../../../../shared/toasts/toast-success";
import ToastWarning from "../../../../shared/toasts/toast-warning";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: UserOutputDto | null = null;
  validPostPageableOutputDto: PostPageableOutputDto | null = null;
  validPostPage: number = 0;
  invalidPostPageableOutputDto: PostPageableOutputDto | null = null;
  invalidPostPage: number = 0;
  pendingPostPageableOutputDto: PostPageableOutputDto | null = null;
  pendingPostPage: number = 0;
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
          this.readAllByUserIdAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(userId, "true", this.validPostPage);
          this.readAllByUserIdAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(userId, "false", this.invalidPostPage);
          this.readAllByUserIdAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(userId, "null", this.pendingPostPage);
          this.readCommentsAllByUserIdOrderByCreatedAtDesc(userId, this.commentPage);
        },
        error: (err: any) => {
          this.router.navigate(['/users']);
          // console.log(err);
        }
      });
      this.currentUser = this.authService.getUser();
    });
  }
  private readAllByUserIdAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(userId: number, valid: string, page: number): void {
    this.postsService.readAllByUserIdAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(userId, valid, this.validPostPage)
      .subscribe({
        next: (res: PostPageableOutputDto) => {
          if (valid === "true") {
            this.validPostPageableOutputDto = res;
          } else if (valid === "false") {
            this.invalidPostPageableOutputDto = res;
          } else {
            this.pendingPostPageableOutputDto = res;
          }
        },
        error: (err: any) => {
          if (valid === "true") {
            this.validPostPageableOutputDto = null;
          } else if (valid === "false") {
            this.invalidPostPageableOutputDto = null;
          } else {
            this.pendingPostPageableOutputDto = null;
          }
          // console.log(err.error);
        }
      });
  }
  private readCommentsAllByUserIdOrderByCreatedAtDesc(userId: number, page: number): void {
    this.commentsService.readAllByUserIdOrderByCreatedAtDesc(userId, this.commentPage)
      .subscribe({
        next: (res: CommentPageableOutputDto) => this.commentPageableOutputDto = res,
        error: (err: any) => {
          this.commentPageableOutputDto = null;
          // console.log(err);
        }
      });
  }
  previousValidPostPage(): void {
    this.readAllByUserIdAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(this.user?.id!, "true", --this.validPostPage);
  }
  nextValidPostPage(): void {
    this.readAllByUserIdAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(this.user?.id!, "true", ++this.validPostPage);
  }
  previousInvalidPostPage(): void {
    this.readAllByUserIdAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(this.user?.id!, "false", --this.invalidPostPage);
  }
  nextInvalidPostPage(): void {
    this.readAllByUserIdAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(this.user?.id!, "false", ++this.invalidPostPage);
  }
  previousPendingPostPage(): void {
    this.readAllByUserIdAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(this.user?.id!, "null", --this.pendingPostPage);
  }
  nextPendingPostPage(): void {
    this.readAllByUserIdAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(this.user?.id!, "null", ++this.pendingPostPage);
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
      next: () => {
        if (this.user?.id !== this.currentUser?.id) {
          this.router.navigate(['/users']);
          ToastSuccess.fire({
            text: `${this.user?.username} has been deleted successfully`
          });
        } else {
          this.authService.onSignOut();
          this.router.navigate(['/welcome']);
          ToastSuccess.fire({
            text: "Your account has been deleted successfully"
          });
        }
      },
      error: (err: any) => {
        ToastError.fire({
          text: err.status === 500 ? "Internal server error" : err.error.message
        });
        // console.log(err);
      }
    });
  }
  blockOrUnblock(): void {
    if (!this.user || this.currentUser?.role.authority !== "ROLE_MODERATOR") {
      ToastWarning.fire({
        text: "You are not allowed to block or unblock this user"
      });
      return;
    }
    this.usersService.blockOrUnblock(this.user.id).subscribe({
      next: () => {
        this.user!.blocked = !this.user!.blocked;
        ToastSuccess.fire({
          text: `${this.user?.username} has been ${this.user?.blocked ? "blocked" : "unblocked"} successfully`
        });
      },
      error: (err: any) => {
        ToastWarning.fire({
          text: err.status === 500 ? "Internal server error" : err.error.message
        });
        // console.log(err);
      }
    });
  }
}
