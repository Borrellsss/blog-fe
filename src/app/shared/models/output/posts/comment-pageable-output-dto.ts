import { CommentOutputDto } from "./comment-output-dto";

export interface CommentPageableOutputDto {
  comments: Array<CommentOutputDto>;
  totalPages: number;
  totalElements: number;
}
