import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CategoryOutputDto } from "../../shared/models/output/categories/category-output-dto";
import { CategoryPageableOutputDto } from "../../shared/models/output/categories/category-pageable-output-dto";
import { TagPageableOutputDto } from "../../shared/models/output/tags/tag-pageable-output-dto";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) { }

  readAll(page: number = 0): Observable<CategoryPageableOutputDto> {
    return this.http.get<CategoryPageableOutputDto>("categories", {
      params: {
        page: page
      }
    });
  }
  readAllByOrderByName(page: number = 0): Observable<CategoryPageableOutputDto> {
    return this.http.get<CategoryPageableOutputDto>("categories/order-by-name", {
      params: {
        page: page
      }
    });
  }
  readAllByNameContainsOrderByName(name: string, page: number = 0): Observable<CategoryPageableOutputDto> {
    return this.http.get<CategoryPageableOutputDto>("categories/like", {
      params: {
        name: name,
        page: page
      }
    });
  }
  readByName(name: string): Observable<CategoryOutputDto> {
    return this.http.get<CategoryOutputDto>(`categories/name/${name}`);
  }
}
