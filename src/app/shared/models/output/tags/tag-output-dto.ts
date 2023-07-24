import { CategoryOutputDto } from "./category-output-dto";

export interface TagOutputDto {
  id: number;
  name: string;
  description: string;
  createdBy: number;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
  categories: Array<CategoryOutputDto>;
}
