import { TagOutputDto } from "../categories/tag-output-dto";
import { CategoryOutputDto } from "../tags/category-output-dto";
import { UserOutputDto } from "../users/user-output-dto";
import { VoteOutputDto } from "./vote-output-dto";

export interface PostOutputDto {
  id: number;
  title: string
  content: string;
  valid: boolean | null;
  verifiedBy: number;
  verifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  user: UserOutputDto;
  category: CategoryOutputDto;
  tags: Array<TagOutputDto>;
  votes: Array<VoteOutputDto>;
}
