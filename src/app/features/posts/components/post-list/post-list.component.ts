import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommentsService } from "../../../../core/services/comments.service";
import { PostsService } from "../../../../core/services/posts.service";
import { PostPageableOutputDto } from "../../../../shared/models/output/posts/post-pageable-output-dto";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  postPageableOutputDto: PostPageableOutputDto | null = null;
  page: number = 0;
  postListForm: FormGroup = new FormGroup({});
  private isFilterActive: boolean = false;
  private title: string | null = null;
  private category: string | null = null;
  private tag: string | null = null;

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params["tag"]) {
        this.tag = params["tag"];
        this.readAllByTagsNameOrderByCreatedAtDesc(params["tag"], this.page);
      } else if (params["category"]) {
        this.category = params["category"];
        this.readAllByCategoryNameOrderByCreatedAtDesc(params["category"], this.page);
      } else {
        this.readAllByOrderByCreatedAtDesc(this.page);
      }
    });
    this.postListForm = new FormGroup({
      title: new FormControl(null)
    });
  }

  private readAllByOrderByCreatedAtDesc(page: number): void {
    this.postsService.readAllByOrderByCreatedAtDesc(page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => console.log(err)
    });
  }
  private readAllByTitleContainingOrderByCreatedAtDesc(title: string, page: number): void {
    this.postsService.readAllByTitleContainingOrderByCreatedAtDesc(title, this.page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => {
        this.postPageableOutputDto = null;
        console.log(err);
      }
    });
  }
  private readAllByTagsNameOrderByCreatedAtDesc(tag: string, page: number): void {
    this.postsService.readAllByTagsNameOrderByCreatedAtDesc(tag.replaceAll("%", " "), this.page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => console.log(err)
    });
  }
  private readAllByCategoryNameAndTitleContainingOrderByCreatedAtDesc(categoryName: string, title: string, page: number): void {
    this.postsService.readAllByCategoryNameAndTitleContainingOrderByCreatedAtDesc(categoryName.replaceAll("%", " "), title, this.page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => {
        this.postPageableOutputDto = null;
        console.log(err);
      }
    });
  }
  private readAllByCategoryNameOrderByCreatedAtDesc(category: string, page: number): void {
    this.postsService.readAllByCategoryNameOrderByCreatedAtDesc(category.replaceAll("%", " "), this.page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => console.log(err)
    });
  }
  private readAllByTagsNameAndTitleContainingOrderByCreatedAtDesc(tagName: string, title: string, page: number): void {
    this.postsService.readAllByTagsNameAndTitleContainingOrderByCreatedAtDesc(tagName.replaceAll("%", " "), title, this.page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => {
        this.postPageableOutputDto = null;
        console.log(err);
      }
    });
  }
  filterPosts(): void {
    this.title = this.postListForm.controls["title"].value;
    this.page = 0;
    if (!this.title) {
      this.isFilterActive = false;
      if (this.tag) {
        this.readAllByTagsNameOrderByCreatedAtDesc(this.tag, this.page);
      } else if (this.category) {
        this.readAllByCategoryNameOrderByCreatedAtDesc(this.category, this.page);
      } else {
        this.readAllByOrderByCreatedAtDesc(this.page);
      }
    } else {
      this.isFilterActive = true;
      if (this.tag) {
        this.readAllByTagsNameAndTitleContainingOrderByCreatedAtDesc(this.tag, this.title, this.page);
      } else if (this.category) {
        this.readAllByCategoryNameAndTitleContainingOrderByCreatedAtDesc(this.category, this.title, this.page);
      } else {
        this.readAllByTitleContainingOrderByCreatedAtDesc(this.title, this.page);
      }
    }
  }
  nextPage(): void {
    if (this.isFilterActive) {
      if (this.tag) {
        this.readAllByTagsNameOrderByCreatedAtDesc(this.tag, ++this.page);
      } else if (this.category) {
        this.readAllByCategoryNameOrderByCreatedAtDesc(this.category, ++this.page);
      } else {
        this.readAllByOrderByCreatedAtDesc(++this.page);
      }
    } else {
      if (this.tag) {
        this.readAllByTagsNameAndTitleContainingOrderByCreatedAtDesc(this.tag, this.title!, ++this.page);
      } else if (this.category) {
        this.readAllByCategoryNameAndTitleContainingOrderByCreatedAtDesc(this.category, this.title!, ++this.page);
      } else {
        this.readAllByTitleContainingOrderByCreatedAtDesc(this.title!, ++this.page);
      }
    }
  }
  previousPage(): void {
    if (this.isFilterActive) {
      if (this.tag) {
        this.readAllByTagsNameOrderByCreatedAtDesc(this.tag, --this.page);
      } else if (this.category) {
        this.readAllByCategoryNameOrderByCreatedAtDesc(this.category, --this.page);
      } else {
        this.readAllByOrderByCreatedAtDesc(--this.page);
      }
    } else {
      if (this.tag) {
        this.readAllByTagsNameAndTitleContainingOrderByCreatedAtDesc(this.tag, this.title!, --this.page);
      } else if (this.category) {
        this.readAllByCategoryNameAndTitleContainingOrderByCreatedAtDesc(this.category, this.title!, --this.page);
      } else {
        this.readAllByTitleContainingOrderByCreatedAtDesc(this.title!, --this.page);
      }
    }
  }
}
