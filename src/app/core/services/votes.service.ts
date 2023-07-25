import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { VoteInputDto } from "../../shared/models/input/vote-input-dto";
import { VoteOutputDto } from "../../shared/models/output/votes/vote-output-dto";

@Injectable({
  providedIn: 'root'
})
export class VotesService {
  constructor(private http: HttpClient) { }

  create(voteInputDto: VoteInputDto): Observable<VoteOutputDto> {
    return this.http.post<VoteOutputDto>("votes", voteInputDto);
  }
  readByUserIdAndPostId(userId: number, postId: number): Observable<VoteOutputDto> {
    return this.http.get<VoteOutputDto>(`votes/${userId}/${postId}`);
  }
  countPostLikes(postId: number, liked: boolean): Observable<number> {
    return this.http.get<number>("votes", {
      params: {
        post: postId,
        liked: liked
      }
    });
  }
  update(voteInputDto: VoteInputDto): Observable<VoteOutputDto> {
    return this.http.put<VoteOutputDto>("votes", voteInputDto);
  }
  delete(voteInputDto: VoteInputDto): Observable<void> {
    return this.http.delete<void>("votes", {
      body: voteInputDto
    });
  }
}
