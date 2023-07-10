import { UserOutputDto } from "./user-output-dto";

export interface SignInOutputDto {
  jwt: string;
  user: UserOutputDto;
}
