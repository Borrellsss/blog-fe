import { ErrorMessageOutputDto } from "./error-message-output-dto";

export interface ErrorMessagePageableOutputDto {
  errorMessages: Array<ErrorMessageOutputDto>;
  totalPages: number;
  totalElements: number;
}
