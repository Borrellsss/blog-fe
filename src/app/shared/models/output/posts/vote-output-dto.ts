import { UserOutputDto } from "../users/user-output-dto";

export interface VoteOutputDto {
  user: UserOutputDto;
  liked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
