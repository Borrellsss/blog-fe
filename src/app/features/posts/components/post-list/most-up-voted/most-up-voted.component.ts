import { Component } from '@angular/core';

import { PostsService } from "../../../../../core/services/posts.service";
import { PostPageableOutputDto } from "../../../../../shared/models/output/posts/post-pageable-output-dto";

@Component({
  selector: 'app-most-up-voted',
  templateUrl: './most-up-voted.component.html',
  styleUrls: ['./most-up-voted.component.scss']
})
export class MostUpVotedComponent {
  postPageableOutputDto: PostPageableOutputDto | null = null;
  page: number = 0;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.readAllByVotesIsTrueAndValidIsTrueAndUserDeletedIsFalseOrderByVotesDesc(this.page);
  }

  private readAllByVotesIsTrueAndValidIsTrueAndUserDeletedIsFalseOrderByVotesDesc(page: number): void {
    this.postsService.readAllByVotesIsTrueAndValidIsTrueAndUserDeletedIsFalseOrderByVotesDesc(page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => {
        // console.log(err);
      }
    });
  }
  nextPage(): void {
    this.readAllByVotesIsTrueAndValidIsTrueAndUserDeletedIsFalseOrderByVotesDesc(++this.page);
  }
  previousPage(): void {
    this.readAllByVotesIsTrueAndValidIsTrueAndUserDeletedIsFalseOrderByVotesDesc(--this.page);
  }
}
