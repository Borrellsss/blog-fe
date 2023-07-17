import { Component, OnInit } from '@angular/core';
import { TagsService } from "../../../../core/services/tags.service";
import { TagPageableOutputDto } from "../../../../shared/models/output/tags/tag-pageable-output-dto";

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  tagPageableOutputDto?: TagPageableOutputDto;
  page: number = 0;

  constructor(private tagService: TagsService) { }

  ngOnInit(): void {
    this.tagService.readAll(0).subscribe({
      next: (res: TagPageableOutputDto) => this.tagPageableOutputDto = res,
      error: (err) => console.log(err)
    });
  }

  previous(): void {
    this.tagService.readAll(--this.page).subscribe({
      next: (res: TagPageableOutputDto) => {
        this.tagPageableOutputDto = res;
        console.log(this.tagPageableOutputDto)
      },
      error: (err) => console.log(err)
    });
  }
  next(): void {
    this.tagService.readAll(++this.page).subscribe({
      next: (res: TagPageableOutputDto) => this.tagPageableOutputDto = res,
      error: (err) => console.log(err)
    });
  }
}
