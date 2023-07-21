import { UserOutputDto } from "./user-output-dto";

export interface UserPageableOutputDto {
  users: Array<UserOutputDto>;
  totalPages: number;
  totalElements: number;
}
