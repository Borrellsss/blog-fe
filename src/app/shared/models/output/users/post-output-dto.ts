import { CategoryOutputDto } from "../posts/category-output-dto";
import { TagOutputDto } from "../posts/tag-output-dto";

export interface PostOutputDto {
  id: number;
  title: string
  content: string;
  valid: boolean;
  verifiedBy: number;
  verifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryOutputDto;
  tags: Array<TagOutputDto>;
  votes: number;
}
