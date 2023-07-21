import { PostOutputDto } from "./post-output-dto";
import { UserOutputDto } from "./user-output-dto";

export interface VoteOutputDto {
  user: UserOutputDto;
  post: PostOutputDto;
  liked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
