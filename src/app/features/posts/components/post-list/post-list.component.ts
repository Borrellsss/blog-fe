import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PostsService } from "../../../../core/services/posts.service";
import { PostPageableOutputDto } from "../../../../shared/models/output/posts/post-pageable-output-dto";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  postPageableOutputDto: PostPageableOutputDto | null = null;
  postPage: number = 0;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.readAllByOrderByCreatedAtDesc(this.postPage);
  }

  private readAllByOrderByCreatedAtDesc(page: number): void {
    this.postsService.findAllByOrderByUpdatedAtDesc(page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => console.log(err)
    });
  }
  nextPage(): void {
    this.readAllByOrderByCreatedAtDesc(++this.postPage);
  }
  previousPage(): void {
    this.readAllByOrderByCreatedAtDesc(--this.postPage);
  }
}
