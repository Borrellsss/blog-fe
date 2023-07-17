import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { TagPageableOutputDto } from "../../shared/models/output/tags/tag-pageable-output-dto";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private http: HttpClient) { }

  readAll(page: number = 0): Observable<TagPageableOutputDto> {
    return this.http.get<TagPageableOutputDto>("tags", {
      params: {
        page: page.toString()
      }
    });
  }
}
