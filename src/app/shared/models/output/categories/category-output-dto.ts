import { TagOutputDto } from "./tag-output-dto";

export interface CategoryOutputDto {
  id: number;
  name: string;
  createdBy: number;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Array<TagOutputDto>;
}
