import { Component } from '@angular/core';
import { CommentsService } from "../../../../../core/services/comments.service";
import { PostsService } from "../../../../../core/services/posts.service";
import { PostPageableOutputDto } from "../../../../../shared/models/output/posts/post-pageable-output-dto";

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent {
  postPageableOutputDto: PostPageableOutputDto | null = null;
  page: number = 0;

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService,
  ) { }

  ngOnInit(): void {
    this.readAllByOrderByCommentsDesc(this.page);
  }

  private readAllByOrderByCommentsDesc(page: number): void {
    this.postsService.readAllByOrderByCommentsDesc(page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => console.log(err)
    });
  }
  nextPage(): void {
    this.readAllByOrderByCommentsDesc(++this.page);
  }
  previousPage(): void {
    this.readAllByOrderByCommentsDesc(--this.page);
  }
}
