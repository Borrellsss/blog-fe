import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { take, timer } from "rxjs";
import {
  ImageSettingsModel,
  ImageUploadingEventArgs,
  ToolbarSettingsModel
} from "@syncfusion/ej2-angular-richtexteditor";

import { CategoriesService } from "../../../../core/services/categories.service";
import { PostsService } from "../../../../core/services/posts.service";
import { TagsService } from "../../../../core/services/tags.service";
import { ValidatorService } from "../../../../core/services/utils/validator.service";
import { ValidationsService } from "../../../../core/services/validations.service";
import { PostInputDto } from "../../../../shared/models/input/post-input-dto";
import { CategoryOutputDto } from "../../../../shared/models/output/categories/category-output-dto";
import { CategoryPageableOutputDto } from "../../../../shared/models/output/categories/category-pageable-output-dto";
import { TagOutputDto } from "../../../../shared/models/output/categories/tag-output-dto";
import { PostOutputDto } from "../../../../shared/models/output/posts/post-output-dto";
import { TagPageableOutputDto } from "../../../../shared/models/output/tags/tag-pageable-output-dto";
import { ValidationOutputDto } from "../../../../shared/models/output/validations/validation-output-dto";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  prefix: string = "PostInputDto";
  postForm: FormGroup = new FormGroup({});
  tagsSet: Set<number> = new Set<number>()
  errors: Map<string, Array<string>> = new Map();
  post: PostOutputDto | null = null;
  categoryPageableOutputDto: CategoryPageableOutputDto | null = null;
  categoryPage: number = 0;
  tagPageableOutputDto: TagPageableOutputDto | null = null;
  tagPage: number = 0;
  public imageSettings: ImageSettingsModel = {
    saveFormat: "Base64"
  }
  public customToolbar: ToolbarSettingsModel = {
    items: [
      "Bold",
      "Italic",
      "Underline",
      "StrikeThrough",
      "|",
      "CreateTable",
      "CreateLink",
      "Image",
      "|",
      "Undo",
      "Redo",
    ]
  }
  onImageUploading = (args: ImageUploadingEventArgs) => {
    console.log("file is uploading");
    let imgSize: number = 500000;
    let sizeInBytes: number = args.filesData[0].size;
    if (imgSize < sizeInBytes) {
      args.cancel = true;
    }
  }

  constructor(
    private postsService: PostsService,
    private categoriesService: CategoriesService,
    private tagsService: TagsService,
    private validationsService: ValidationsService,
    private formValidatorService: ValidatorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reset();
    const postId = this.route.snapshot.queryParams["post"];
    this.postForm = new FormGroup({
      title: new FormControl(null),
      category: new FormControl(null),
      content: new FormControl(null)
    });
    if (postId) {
      this.postsService.readById(postId).subscribe({
        next: (res: PostOutputDto) => {
          this.post = res;
          this.postForm.controls["title"].setValue(this.post.title);
          this.postForm.controls["category"].setValue(this.post.category.name);
          this.postForm.controls["content"].setValue(this.post.content);
          this.tagsSet = new Set<number>(this.post.tags.map((tag: TagOutputDto) => tag.id));
        },
        error: (err) => console.log(err)
      });
    }
    this.readAllCategories(this.categoryPage);
  }

  private reset() {
    this.validationsService.readByFieldStartsWith(this.prefix)
      .subscribe({
        next: (res: Array<ValidationOutputDto>) => {
          this.formValidatorService.validations = res;
        },
        error: (err) => console.error(err)
      });
    this.errors.clear();
    this.postForm.markAsPristine();
  }
  private readAllCategories(page: number): void {
    if (!this.post) {
      this.postForm.controls["category"].setValue(null);
      this.tagsSet = new Set<number>();
    }
    this.categoriesService.readAll(page).subscribe({
      next: (res: CategoryPageableOutputDto) => {
        this.categoryPageableOutputDto = res;
      },
      error: (err) => console.log(err)
    })
  }
  readAllTagsByCategoryName(categoryName: string, page: number): void {
    this.tagsService.readByCategoryName(categoryName, page).subscribe({
      next: (res: TagPageableOutputDto) => {
        this.tagPageableOutputDto = res;
        timer(250).pipe(take(1))
          .subscribe(() => this.setTags());
      },
      error: (err) => {
        this.tagPageableOutputDto = null;
        console.log(err);
      }
    });
  }
  nextCategoryPage(): void {
    this.readAllCategories(++this.categoryPage);
    this.tagPageableOutputDto = null;
    this.tagPage = 0;
  }
  previousCategoryPage(): void {
    this.readAllCategories(--this.categoryPage);
    this.tagPageableOutputDto = null;
    this.tagPage = 0;
  }
  nextTagsPage(): void {
    this.readAllTagsByCategoryName(this.postForm.controls["category"].value, ++this.tagPage);
  }
  previousTagsPage(): void {
    this.readAllTagsByCategoryName(this.postForm.controls["category"].value, --this.tagPage);
  }
  private setTags(): void {
    document.querySelectorAll("[type='checkbox']").forEach((el: Element)  => {
      const checkbox = el as HTMLInputElement;
      console.log(checkbox.value);
      console.log(this.tagsSet);
      if (this.tagsSet.has(+checkbox.value)) {
        checkbox.checked = true;
      }
    });
  }
  addOrRemoveTag(event: MouseEvent, id: number): void {
    if (this.tagsSet.has(id)) {
      this.tagsSet.delete(id);
    } else {
      this.tagsSet.add(id);
    }
  }
  createOrUpdate(): void {
    this.reset();
    const tags: Array<number> = this.post ? this.post.tags.map((tag: TagOutputDto) => tag.id) : [...this.tagsSet];
    const category: number | null = this.categoryPageableOutputDto?.categories
      .filter((category: CategoryOutputDto) =>
        category.name === this.postForm.controls["category"].value)[0]?.id || null;
    const postInputDto: PostInputDto = {
      title: this.post ? this.post.title : this.postForm.controls["title"].value,
      content: this.postForm.controls["content"].value,
      valid: this.post ? this.post.valid : null,
      category: this.post ? this.post.category.id : category,
      tags: tags
    }
    timer(200).pipe(take(1)).subscribe(() => {
      this.formValidatorService.validate(postInputDto, this.prefix);
      if (this.formValidatorService.errors.size > 0) {
        this.formValidatorService.errors
          .forEach((value, key) =>
            this.errors.set(key, value.map(errorMessage => errorMessage.message)));
        return;
      }
      if (this.post) {
        this.postsService.update(this.post.id, postInputDto).subscribe({
          next: (res: PostOutputDto) => {
            this.postForm.reset();
            this.router.navigate(['/posts/details/', res.user.id, res.id, res.title.replaceAll(" ", "-")]);
          },
          error: (err) => console.log(err)
        });
      } else {
        this.postsService.create(postInputDto).subscribe({
          next: (res: PostOutputDto) => {
            this.postForm.reset();
            this.router.navigate(['/posts/details/', res.user.id, res.id, res.title.replaceAll(" ", "-")]);
          },
          error: (err) => console.log(err)
        });
      }
    });
  }
}
