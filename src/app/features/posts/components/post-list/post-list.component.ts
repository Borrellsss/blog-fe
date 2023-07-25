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
        this.readAllByTagsNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(params["tag"], this.page);
      } else if (params["category"]) {
        this.category = params["category"];
        this.readAllByCategoryNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(params["category"], this.page);
      } else {
        this.readAllByValidAndUserDeletedIsFalseOrderByCreatedAtDesc(this.page);
      }
    });
    this.postListForm = new FormGroup({
      title: new FormControl(null)
    });
  }

  private readAllByValidAndUserDeletedIsFalseOrderByCreatedAtDesc(page: number): void {
    this.postsService.readAllByValidAndUserDeletedIsFalseOrderByCreatedAtDesc("true", page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => {
        console.log(err);
      }
    });
  }
  private readAllByTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(title: string, page: number): void {
    this.postsService.readAllByTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(title, this.page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => {
        this.postPageableOutputDto = null;
        // console.log(err);
      }
    });
  }
  private readAllByTagsNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(tag: string, page: number): void {
    this.postsService.readAllByTagsNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(tag.replaceAll("%", " "), this.page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => {
        // console.log(err);
      }
    });
  }
  private readAllByCategoryNameAndTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(categoryName: string, title: string, page: number): void {
    this.postsService.readAllByCategoryNameAndTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(categoryName.replaceAll("%", " "), title, this.page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => {
        this.postPageableOutputDto = null;
        // console.log(err);
      }
    });
  }
  private readAllByCategoryNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(category: string, page: number): void {
    this.postsService.readAllByCategoryNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(category.replaceAll("%", " "), this.page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => {
        // console.log(err)
      }
    });
  }
  private readAllByTagsNameAndTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(tagName: string, title: string, page: number): void {
    this.postsService.readAllByTagsNameAndTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(tagName.replaceAll("%", " "), title, this.page).subscribe({
      next: (res: PostPageableOutputDto) => this.postPageableOutputDto = res,
      error: (err) => {
        this.postPageableOutputDto = null;
        // console.log(err);
      }
    });
  }
  filterPosts(): void {
    this.title = this.postListForm.controls["title"].value;
    this.page = 0;
    if (!this.title) {
      this.isFilterActive = false;
      if (this.tag) {
        this.readAllByTagsNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.tag, this.page);
      } else if (this.category) {
        this.readAllByCategoryNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.category, this.page);
      } else {
        this.readAllByValidAndUserDeletedIsFalseOrderByCreatedAtDesc(this.page);
      }
    } else {
      this.isFilterActive = true;
      if (this.tag) {
        this.readAllByTagsNameAndTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.tag, this.title, this.page);
      } else if (this.category) {
        this.readAllByCategoryNameAndTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.category, this.title, this.page);
      } else {
        this.readAllByTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.title, this.page);
      }
    }
  }
  nextPage(): void {
    if (this.isFilterActive) {
      if (this.tag) {
        this.readAllByTagsNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.tag, ++this.page);
      } else if (this.category) {
        this.readAllByCategoryNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.category, ++this.page);
      } else {
        this.readAllByValidAndUserDeletedIsFalseOrderByCreatedAtDesc(++this.page);
      }
    } else {
      if (this.tag) {
        this.readAllByTagsNameAndTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.tag, this.title!, ++this.page);
      } else if (this.category) {
        this.readAllByCategoryNameAndTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.category, this.title!, ++this.page);
      } else {
        this.readAllByTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.title!, ++this.page);
      }
    }
  }
  previousPage(): void {
    if (this.isFilterActive) {
      if (this.tag) {
        this.readAllByTagsNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.tag, --this.page);
      } else if (this.category) {
        this.readAllByCategoryNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.category, --this.page);
      } else {
        this.readAllByValidAndUserDeletedIsFalseOrderByCreatedAtDesc(--this.page);
      }
    } else {
      if (this.tag) {
        this.readAllByTagsNameAndTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.tag, this.title!, --this.page);
      } else if (this.category) {
        this.readAllByCategoryNameAndTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.category, this.title!, --this.page);
      } else {
        this.readAllByTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(this.title!, --this.page);
      }
    }
  }
}
