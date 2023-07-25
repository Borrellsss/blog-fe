import { PostOutputDto } from "../comments/post-output-dto";
import { UserOutputDto } from "../users/user-output-dto";

export interface VoteOutputDto {
  user: UserOutputDto;
  post: PostOutputDto;
  liked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
