import { UserOutputDto } from "../users/user-output-dto";
import { PostOutputDto } from "./post-output-dto";

export interface CommentOutputDto {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  post: PostOutputDto;
  user: UserOutputDto;
}
