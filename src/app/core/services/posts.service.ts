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
  readAllByOrderByCommentsDesc(page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/most-popular", {
      params: {
        page: page
      }
    });
  }
  readAllByVotesIsTrueOrderByVotesDesc(page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/most-up-voted", {
      params: {
        page: page
      }
    });
  }
  readAllByOrderByCreatedAtDesc(page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts`, {
      params: {
        page: page
      }
    });
  }
  readAllByTitleContainingOrderByCreatedAtDesc(title: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/title-contains`, {
      params: {
        value: title,
        page: page
      }
    });
  }
  readAllByCategoryNameOrderByCreatedAtDesc(name: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/category", {
      params: {
        name: name,
        page: page
      }
    });
  }
  readAllByCategoryNameAndTitleContainingOrderByCreatedAtDesc(categoryName: string, title: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/category/${categoryName}/title-contains`, {
      params: {
        value: title,
        page: page
      }
    });
  }
  readAllByTagsNameOrderByCreatedAtDesc(name: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/tag", {
      params: {
        name: name,
        page: page
      }
    });
  }
  readAllByTagsNameAndTitleContainingOrderByCreatedAtDesc(tagName: string, title: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/tag/${tagName}/title-contains`, {
      params: {
        value: title,
        page: page
      }
    });
  }
  readAllByUserIdOrderByCreatedAtDesc(userId: number, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/user/${userId}`, {
      params: {
        page: page
      }
    });
  }
  readAllByUserUsernameOrderByCreatedAtDesc(username: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/user", {
      params: {
        username: username,
        page: page
      }
    });
  }
  readAllByUserUsernameAndTitleContainingOrderByCreatedAtDesc(username: string, title: string, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>(`posts/user/${username}/title-contains`, {
      params: {
        value: title,
        page: page
      }
    });
  }
  readAllByValidOrderByCreatedAtDesc(valid: boolean, page: number = 0): Observable<PostPageableOutputDto> {
    return this.http.get<PostPageableOutputDto>("posts/state", {
      params: {
        valid: valid,
        page: page
      }
    });
  }
  readById(id: number): Observable<PostOutputDto> {
    return this.http.get<PostOutputDto>(`posts/${id}`);
  }
  readByTitle(title: string): Observable<PostOutputDto> {
    return this.http.get<PostOutputDto>(`posts/title/${title}`);
  }
  update(id: number, postInputDto: PostInputDto): Observable<PostOutputDto> {
    return this.http.put<PostOutputDto>(`posts/${id}`, postInputDto);
  }
  accept(id: number): Observable<PostOutputDto> {
    return this.http.put<PostOutputDto>(`posts/${id}/accept`, null);
  }
  reject(id: number): Observable<PostOutputDto> {
    return this.http.put<PostOutputDto>(`posts/${id}/reject`, null);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`posts/${id}`);
  }
}
