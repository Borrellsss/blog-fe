import { PostOutputDto } from "./post-output-dto";

export interface PostPageableOutputDto {
  posts: Array<PostOutputDto>;
  totalPages: number;
  totalElements: number;
}
