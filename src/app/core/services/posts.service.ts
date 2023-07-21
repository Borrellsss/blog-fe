import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { PostInputDto } from "../../shared/models/input/post-input-dto";
import { PostOutputDto } from "../../shared/models/output/posts/post-output-dto";
import { PostPageableOutputDto } from "../../shared/models/output/posts/post-pageable-output-dto";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }

  create(postInputDto: PostInputDto): Observable<PostOutputDto> {
    return this.http.post<PostOutputDto>("posts", postInputDto);
  }
  readById(id: number): Observable<PostOutputDto> {
    return this.http.get<PostOutputDto>(`posts/${id}`);
  }
  readByTitle(title: string): Observable<PostOutputDto> {
    return this.http.get<PostOutputDto>(`posts/title/${title}`);
  }
  findAllByOrderByUpdatedAtDesc(page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts`, {
      params: {
        page: page
      }
    });
  }
  update(id: number, postInputDto: PostInputDto): Observable<PostOutputDto> {
    return this.http.put<PostOutputDto>(`posts/${id}`, postInputDto);
  }
}
