import { ValidationOutputDto } from "./validation-output-dto";

export interface ErrorMessageOutputDto {
  id: number;
  errorType: string;
  message: string;
  validationCode: string;
  createdBy: number;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
  validations: Array<ValidationOutputDto>;
}
