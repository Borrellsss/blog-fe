import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { take, timer } from "rxjs";

import { CommentsService } from "../../../../core/services/comments.service";
import { PostsService } from "../../../../core/services/posts.service";
import { UsersService } from "../../../../core/services/users.service";
import { AuthService } from "../../../../core/services/utils/auth.service";
import { ValidatorService } from "../../../../core/services/utils/validator.service";
import { ValidationsService } from "../../../../core/services/validations.service";
import { VotesService } from "../../../../core/services/votes.service";
import { CommentInputDto } from "../../../../shared/models/input/comment-input-dto";
import { VoteInputDto } from "../../../../shared/models/input/vote-input-dto";
import { CommentOutputDto } from "../../../../shared/models/output/posts/comment-output-dto";
import { CommentPageableOutputDto } from "../../../../shared/models/output/posts/comment-pageable-output-dto";
import { PostOutputDto } from "../../../../shared/models/output/posts/post-output-dto";
import { VoteOutputDto } from "../../../../shared/models/output/posts/vote-output-dto";
import { UserOutputDto } from "../../../../shared/models/output/users/user-output-dto";
import { ValidationOutputDto } from "../../../../shared/models/output/validations/validation-output-dto";
import ToastError from "../../../../shared/toasts/toast-error";
import ToastSuccess from "../../../../shared/toasts/toast-success";
import ToastWarning from "../../../../shared/toasts/toast-warning";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  prefix: string = "CommentInputDto";
  post: PostOutputDto | null = null;
  liked: boolean = false;
  disliked: boolean = false;
  likes: number = 0;
  commentPageableOutputDto: CommentPageableOutputDto | null = null;
  commentPage: number = 0;
  commentForm: FormGroup = new FormGroup({});
  errors: Map<string, Array<string>> = new Map();
  currentUser: UserOutputDto | null = null;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private votesService: VotesService,
    private commentsService: CommentsService,
    private authService: AuthService,
    private validationsService: ValidationsService,
    private formValidatorService: ValidatorService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.reset();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.postsService.readByIdAndUserDeletedIsFalse(id).subscribe({
        next: (res: PostOutputDto) => {
          this.post = res;
          this.currentUser = this.authService.getUser();
          document.getElementById('post-content')!.innerHTML = this.post?.content;
          this.votesService.readByUserIdAndPostId(this.currentUser?.id!, this.post?.id!).subscribe({
            next: (res: VoteOutputDto) => {
              if (res.liked) {
                this.liked = true;
              } else {
                this.disliked = true;
              }
              this.countLikes();
            },
            error: (err) => {
              this.countLikes();
              // console.log(err);
            }
          });
          this.readComments(this.commentPage);
        },
        error: (err) => {
          this.router.navigate(['/posts/all']);
          // console.log(err);
        }
      });
    });
    this.commentForm = new FormGroup({
      content: new FormControl(null)
    });
  }

  private reset() {
    this.validationsService.readByFieldStartsWith(this.prefix)
      .subscribe({
        next: (res: Array<ValidationOutputDto>) =>
          this.formValidatorService.validations = res,
        error: (err) => {
          // console.error(err);
        }
      });
    this.errors.clear();
    this.commentForm.markAsPristine();
  }
  private createVote(voteInputDto: VoteInputDto): void {
    this.votesService.create(voteInputDto).subscribe({
      next: (res: VoteOutputDto) => {
        if (res.liked) {
          this.liked = true;
        } else {
          this.disliked = true;
        }
        this.countLikes();
      },
      error: (err) => {
        ToastError.fire({
          text: err.status === 500 ? "Internal server error" : err.error.message
        });
        // console.log(err);
      }
    });
  }
  private updateVote(voteInputDto: VoteInputDto): void {
    this.votesService.update(voteInputDto).subscribe({
      next: (res: VoteOutputDto) => {
        if (!this.liked) {
          this.liked = true;
          this.disliked = false;
        } else {
          this.disliked = true;
          this.liked = false;
        }
        this.countLikes();
      },
      error: (err) => {
        ToastError.fire({
          text: err.status === 500 ? "Internal server error" : err.error.message
        });
        // console.log(err);
      }
    });
  }
  private deleteVote(voteInputDto: VoteInputDto): void {
    this.votesService.delete(voteInputDto).subscribe({
      next: () => {
        if (this.liked) {
          this.liked = false;
        } else {
          this.disliked = false;
        }
        this.countLikes();
      },
      error: (err) => {
        ToastError.fire({
          text: err.status === 500 ? "Internal server error" : err.error.message
        });
        // console.log(err);
      }
    });
  }
  addOrRemoveUpVote(): void {
    const voteInputDto: VoteInputDto = {
      post: this.post?.id!,
      user: this.currentUser?.id!,
      liked: true
    };
    if (!this.liked && !this.disliked) {
      this.createVote(voteInputDto);
    } else if (this.liked) {
      this.deleteVote(voteInputDto);
    } else {
      this.updateVote(voteInputDto);
    }
  }
  addOrRemoveDownVote(): void {
    const voteInputDto: VoteInputDto = {
      post: this.post?.id!,
      user: this.currentUser?.id!,
      liked: false
    };
    if (!this.liked && !this.disliked) {
      this.createVote(voteInputDto);
    } else if (this.disliked) {
      this.deleteVote(voteInputDto);
    } else {
      this.updateVote(voteInputDto);
    }
  }
  private countLikes(): void {
    this.votesService.countPostLikes(this.post?.id!, true)
      .subscribe({
        next: (res: number) => {
          this.likes = res;
          this.votesService.countPostLikes(this.post?.id!, false)
            .subscribe({
              next: (res: number) => {
                this.likes -= res;
              },
              error: (err) => {
                // console.log(err);
              }
            });
        },
        error: (err) => {
          // console.log(err);
        }
      });
  }
  private readComments(page: number): void {
    this.commentsService.readAllByPostIdOrderByCreatedAtDesc(this.post?.id!, page).subscribe({
      next: (res: CommentPageableOutputDto) => {
        this.commentPageableOutputDto = res;
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }
  showCommentForm($event: MouseEvent): void {
    const target = $event.target as HTMLElement;
    const commentForm = document.querySelector(".new-comment-section > .form-wrapper-dark-2");
    if (!commentForm) {
      return;
    }
    if (target.closest(".add-validation-error-message")?.classList.contains("active")) {
      this.renderer.removeClass(target.closest(".add-validation-error-message"), "active");
    } else {
      this.renderer.addClass(target.closest(".add-validation-error-message"), "active");
    }
  }
  createComment(): void {
    this.reset();
    const commentInputDto: CommentInputDto = {
      content: this.commentForm.controls["content"].value,
      post: this.post?.id!,
      user: this.currentUser?.id!
    }
    timer(200).pipe(take(1)).subscribe(() => {
      this.formValidatorService.validate(commentInputDto, this.prefix);
      if (this.formValidatorService.errors.size > 0) {
        this.formValidatorService.errors
          .forEach((value, key) =>
            this.errors.set(key, value.map(errorMessage => errorMessage.message)));
        ToastWarning.fire({
          text: "Error please check the comment"
        });
        return;
      }
      this.commentsService.create(commentInputDto).subscribe({
        next: (res: CommentOutputDto ) => {
          this.clearForm(this.commentForm);
          this.commentPage = 0;
          this.readComments(this.commentPage);
          ToastSuccess.fire({
            text: "Comment created successfully"
          });
        },
        error: (err) => {
          ToastError.fire({
            text: err.status === 500 ? "Internal server error" : err.error.message
          });
          // console.log(err);
        }
      });
    });
  }
  nextPage(): void {
    this.readComments(++this.commentPage);
  }
  previousPage(): void {
    this.readComments(--this.commentPage);
  }
  clearForm(form: FormGroup): void {
    this.reset();
    form.reset();
    this.renderer.removeClass(document.querySelector(".add-validation-error-message"), "active");
  }
  accept(): void {
    if (this.currentUser?.role?.authority === "ROLE_MODERATOR") {
      this.postsService.accept(this.post?.id!).subscribe({
        next: () => {
          this.router.navigate(["/posts/all"]);
          ToastSuccess.fire({
            text: "Post accepted successfully"
          });
        },
        error: (err) => {
          ToastError.fire({
            text: err.status === 500 ? "Internal server error" : err.error.message
          });
          // console.log(err);
        }
      });
    } else {
      ToastWarning.fire({
        text: "You don't have permission to accept this post"
      });
    }
  }
  reject(): void {
    if (this.currentUser?.role?.authority === "ROLE_MODERATOR") {
      this.postsService.reject(this.post?.id!).subscribe({
        next: () => {
          this.router.navigate(['/posts/all']);
          ToastSuccess.fire({
            text: "Post rejected successfully"
          });
        },
        error: (err) => {
          ToastError.fire({
            text: err.status === 500 ? "Internal server error" : err.error.message
          });
          // console.log(err);
        }
      });
    } else {
      ToastWarning.fire({
        text: "You don't have permission to accept this post"
      });
    }
  }
  deletePost(): void {
    if (this.post?.user.id === this.currentUser?.id ||
      this.currentUser?.role?.authority === "ROLE_MODERATOR") {
      this.postsService.delete(this.post?.id!).subscribe({
        next: () => {
          this.router.navigate(["/posts/all"]);
          ToastSuccess.fire({
            text: "Post deleted successfully"
          });
        },
        error: (err) => {
          ToastError.fire({
            text: err.status === 500 ? "Internal server error" : err.error.message
          });
          // console.log(err);
        }
      });
    } else {
      ToastWarning.fire({
        text: "You don't have permission to delete this post"
      });
    }
  }
}
