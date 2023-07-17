import { CategoryOutputDto } from "./category-output-dto";

export interface CategoryPageableOutputDto {
  categories: Array<CategoryOutputDto>;
  totalPages: number;
  totalElements: number;
}
