import { TagOutputDto } from "./tag-output-dto";

export interface TagPageableOutputDto {
  tags: Array<TagOutputDto>;
  totalPages: number;
  totalElements: number;
}
