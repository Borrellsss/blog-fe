import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CommentInputDto } from "../../shared/models/input/comment-input-dto";
import { CommentOutputDto } from "../../shared/models/output/posts/comment-output-dto";
import { CommentPageableOutputDto } from "../../shared/models/output/posts/comment-pageable-output-dto";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: HttpClient) { }

  create(commentInputDto: CommentInputDto): Observable<CommentOutputDto> {
    return this.http.post<CommentOutputDto>(`comments`, commentInputDto);
  }
  readByPostIdOrderByCreatedAtDesc(postId: number, page: number): Observable<CommentPageableOutputDto> {
    return this.http.get<CommentPageableOutputDto>(`comments/post/${postId}`, {
      params: {
        page: page
      }
    });
  }
  update(id: number, commentInputDto: CommentInputDto): Observable<CommentOutputDto> {
    return this.http.put<CommentOutputDto>(`comments/${id}`, commentInputDto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`comments/${id}`);
  }
}
