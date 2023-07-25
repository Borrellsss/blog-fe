import { Component, OnInit } from '@angular/core';

import { PostsService } from "../../../../../core/services/posts.service";
import { PostPageableOutputDto } from "../../../../../shared/models/output/posts/post-pageable-output-dto";

@Component({
  selector: 'app-post-pending',
  templateUrl: './post-pending.component.html',
  styleUrls: ['./post-pending.component.scss']
})
export class PostPendingComponent implements OnInit {
  postPageableOutputDto: PostPageableOutputDto | null = null;
  page: number = 0;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.readAllByValidAndUserDeletedIsFalseOrderByCreatedAtDesc(this.page);
  }

  private readAllByValidAndUserDeletedIsFalseOrderByCreatedAtDesc(page: number): void {
    this.postsService.readAllByValidAndUserDeletedIsFalseOrderByCreatedAtDesc("null", page)
      .subscribe({
        next: (res: PostPageableOutputDto) => {
          console.log(res);
          this.postPageableOutputDto = res;
        },
        error: (err: any) => {
          this.postPageableOutputDto = null;
          console.log(err);
        }
      });
  }
  previousPage(): void {
    this.readAllByValidAndUserDeletedIsFalseOrderByCreatedAtDesc(this.page--);
  }
  nextPage(): void {
    this.readAllByValidAndUserDeletedIsFalseOrderByCreatedAtDesc(this.page++);
  }
}
