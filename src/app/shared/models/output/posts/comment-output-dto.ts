import { UserOutputDto } from "../users/user-output-dto";

export interface CommentOutputDto {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserOutputDto;
}
