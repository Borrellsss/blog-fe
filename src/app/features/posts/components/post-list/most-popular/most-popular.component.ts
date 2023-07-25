import { Component } from '@angular/core';

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

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.readAllByValidIsTrueAndUserDeletedIsFalseOrderByCommentsDesc(this.page);
  }

  private readAllByValidIsTrueAndUserDeletedIsFalseOrderByCommentsDesc(page: number): void {
    this.postsService.readAllByValidIsTrueAndUserDeletedIsFalseOrderByCommentsDesc(page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => {
        // console.log(err);
      }
    });
  }
  nextPage(): void {
    this.readAllByValidIsTrueAndUserDeletedIsFalseOrderByCommentsDesc(++this.page);
  }
  previousPage(): void {
    this.readAllByValidIsTrueAndUserDeletedIsFalseOrderByCommentsDesc(--this.page);
  }
}
