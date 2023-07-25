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
  readAllByValidIsTrueAndUserDeletedIsFalseOrderByCommentsDesc(page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/most-popular", {
      params: {
        page: page
      }
    });
  }
  readAllByVotesIsTrueAndValidIsTrueAndUserDeletedIsFalseOrderByVotesDesc(page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/most-up-voted", {
      params: {
        page: page
      }
    });
  }
  readAllByValidAndUserDeletedIsFalseOrderByCreatedAtDesc(valid: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/state", {
      params: {
        valid: valid,
        page: page
      }
    });
  }
  readAllByTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(title: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/title-contains`, {
      params: {
        value: title,
        page: page
      }
    });
  }
  readAllByCategoryNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(name: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/category", {
      params: {
        name: name,
        page: page
      }
    });
  }
  readAllByCategoryNameAndTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(categoryName: string, title: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/category/${categoryName}/title-contains`, {
      params: {
        value: title,
        page: page
      }
    });
  }
  readAllByTagsNameAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(name: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/tag", {
      params: {
        name: name,
        page: page
      }
    });
  }
  readAllByTagsNameAndTitleContainingAndValidIsTrueAndUserDeletedIsFalseOrderByCreatedAtDesc(tagName: string, title: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/tag/${tagName}/title-contains`, {
      params: {
        value: title,
        page: page
      }
    });
  }
  readAllByUserIdAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(userId: number, valid: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/user/${userId}`, {
      params: {
        valid: valid,
        page: page
      }
    });
  }
  readAllByUserUsernameAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(username: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/user", {
      params: {
        username: username,
        page: page
      }
    });
  }
  readAllByUserUsernameAndTitleContainingAndValidAndUserDeletedIsFalseOrderByCreatedAtDesc(username: string, title: string, valid: boolean, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/user/${username}/title-contains`, {
      params: {
        value: title,
        valid: valid,
        page: page
      }
    });
  }
  readByIdAndUserDeletedIsFalse(id: number): Observable<PostOutputDto> {
    return this.http.get<PostOutputDto>(`posts/${id}`);
  }
  readByTitleAndValidIsTrueAndUserDeletedIsFalse(title: string): Observable<PostOutputDto> {
    return this.http.get<PostOutputDto>(`posts/title/${title}`);
  }
  update(id: number, postInputDto: PostInputDto): Observable<PostOutputDto> {
    return this.http.put<PostOutputDto>(`posts/${id}`, postInputDto);
  }
  accept(id: number): Observable<void> {
    return this.http.put<void>(`posts/${id}/accept`, null);
  }
  reject(id: number): Observable<void> {
    return this.http.put<void>(`posts/${id}/reject`, null);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`posts/${id}`);
  }
}
