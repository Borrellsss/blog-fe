import { ValidationOutputDto } from "./validation-output-dto";

export interface ValidationPageableOutputDto {
  validations: Array<ValidationOutputDto>;
  totalPages: number;
  totalElements: number;
}
