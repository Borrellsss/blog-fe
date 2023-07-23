import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { CategoriesService } from "../../../../core/services/categories.service";
import { CategoryPageableOutputDto } from "../../../../shared/models/output/categories/category-pageable-output-dto";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categoryPageableOutputDto: CategoryPageableOutputDto | null = null;
  page: number = 0;
  categoryListForm: FormGroup = new FormGroup({});
  private isFilterActive: boolean = false;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.readAllByOrderByName(this.page);
    this.categoryListForm = new FormGroup({
      name: new FormControl(null)
    });
  }

  private readAllByOrderByName(page: number) {
    this.categoriesService.readAllByOrderByName(page).subscribe({
      next: (res: CategoryPageableOutputDto) => this.categoryPageableOutputDto = res,
      error: (err) => console.log(err)
    });
  }
  private readAllByNameContainsOrderByName(name: string, page: number): void {
    this.categoriesService.readAllByNameContainsOrderByName(name, page).subscribe({
      next: (res: CategoryPageableOutputDto) => {
        this.categoryPageableOutputDto = res
      },
      error: (err) => {
        this.categoryPageableOutputDto = null;
        console.log(err);
      }
    });
  }
  filterCategories(): void {
    const name = this.categoryListForm.controls["name"].value;
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
      this.readAllByNameContainsOrderByName(this.categoryListForm.controls["name"].value, ++this.page);
    }
  }
  previousPage(): void {
    if (!this.isFilterActive) {
      this.readAllByOrderByName(--this.page);
    } else {
      this.readAllByNameContainsOrderByName(this.categoryListForm.controls["name"].value, --this.page);
    }
  }
}
