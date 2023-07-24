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
  readAllByValidIsTrueOrderByCommentsDesc(page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/most-popular", {
      params: {
        page: page
      }
    });
  }
  readAllByVotesIsTrueAndValidIsTrueOrderByVotesDesc(page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/most-up-voted", {
      params: {
        page: page
      }
    });
  }
  readAllByValidOrderByCreatedAtDesc(valid: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/state", {
      params: {
        valid: valid,
        page: page
      }
    });
  }
  readAllByTitleContainingAndValidIsTrueOrderByCreatedAtDesc(title: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/title-contains`, {
      params: {
        value: title,
        page: page
      }
    });
  }
  readAllByCategoryNameAndValidIsTrueOrderByCreatedAtDesc(name: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/category", {
      params: {
        name: name,
        page: page
      }
    });
  }
  readAllByCategoryNameAndTitleContainingAndValidIsTrueOrderByCreatedAtDesc(categoryName: string, title: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/category/${categoryName}/title-contains`, {
      params: {
        value: title,
        page: page
      }
    });
  }
  readAllByTagsNameAndValidIsTrueOrderByCreatedAtDesc(name: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/tag", {
      params: {
        name: name,
        page: page
      }
    });
  }
  readAllByTagsNameAndTitleContainingAndValidIsTrueOrderByCreatedAtDesc(tagName: string, title: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/tag/${tagName}/title-contains`, {
      params: {
        value: title,
        page: page
      }
    });
  }
  readAllByUserIdAndValidOrderByCreatedAtDesc(userId: number, valid: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/user/${userId}`, {
      params: {
        valid: valid,
        page: page
      }
    });
  }
  readAllByUserUsernameAndValidOrderByCreatedAtDesc(username: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/user", {
      params: {
        username: username,
        page: page
      }
    });
  }
  readAllByUserUsernameAndTitleContainingAndValidOrderByCreatedAtDesc(username: string, title: string, valid: boolean, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/user/${username}/title-contains`, {
      params: {
        value: title,
        valid: valid,
        page: page
      }
    });
  }
  readById(id: number): Observable<PostOutputDto> {
    return this.http.get<PostOutputDto>(`posts/${id}`);
  }
  readByTitleAndValidIsTrue(title: string): Observable<PostOutputDto> {
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
