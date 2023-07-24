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
    this.readAllByValidOrderByCreatedAtDesc(this.page);
  }

  private readAllByValidOrderByCreatedAtDesc(page: number): void {
    this.postsService.readAllByValidOrderByCreatedAtDesc("null", page)
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
    this.readAllByValidOrderByCreatedAtDesc(this.page--);
  }
  nextPage(): void {
    this.readAllByValidOrderByCreatedAtDesc(this.page++);
  }
}
