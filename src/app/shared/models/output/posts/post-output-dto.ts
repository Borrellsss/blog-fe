import { UserOutputDto } from "../users/user-output-dto";
import { CategoryOutputDto } from "./category-output-dto";
import { TagOutputDto } from "./tag-output-dto";
import { VoteOutputDto } from "./vote-output-dto";

export interface PostOutputDto {
  id: number;
  title: string
  content: string;
  valid: boolean;
  verifiedBy: number;
  verifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  user: UserOutputDto;
  category: CategoryOutputDto;
  tags: Array<TagOutputDto>;
  votes: Array<VoteOutputDto>;
}
