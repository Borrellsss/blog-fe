import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { TagsService } from "../../../../core/services/tags.service";
import { TagPageableOutputDto } from "../../../../shared/models/output/tags/tag-pageable-output-dto";

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  tagPageableOutputDto: TagPageableOutputDto | null = null;
  page: number = 0;
  tagListForm: FormGroup = new FormGroup({});
  private isFilterActive: boolean = false;

  constructor(private tagService: TagsService) { }

  ngOnInit(): void {
    this.readAllByOrderByName(this.page);
    this.tagListForm = new FormGroup({
      name: new FormControl(null)
    });
  }

  private readAllByOrderByName(page: number) {
    this.tagService.readAllByOrderByName(page).subscribe({
      next: (res: TagPageableOutputDto) => this.tagPageableOutputDto = res,
      error: (err) => console.log(err)
    });
  }
  readAllByNameContainsOrderByName(name: string, page: number): void {
    this.tagService.readAllByNameContainsOrderByName(name, page).subscribe({
      next: (res: TagPageableOutputDto) => {
        this.tagPageableOutputDto = res
      },
      error: (err) => {
        this.tagPageableOutputDto = null;
        console.log(err);
      }
    });
  }
  filterTags(): void {
    const name = this.tagListForm.controls["name"].value;
    this.page = 0;
    if (!name) {
      this.isFilterActive = false;
      this.readAllByOrderByName(this.page);
    } else {
      this.isFilterActive = true;
      this.readAllByNameContainsOrderByName(name, this.page);
    }
  }
  nextPage(): void {
    if (!this.isFilterActive) {
      this.readAllByOrderByName(++this.page);
    } else {
      this.readAllByNameContainsOrderByName(this.tagListForm.controls["name"].value, ++this.page);
    }
  }
  previousPage(): void {
    if (!this.isFilterActive) {
      this.readAllByOrderByName(--this.page);
    } else {
      this.readAllByNameContainsOrderByName(this.tagListForm.controls["name"].value, --this.page);
    }
  }
}
