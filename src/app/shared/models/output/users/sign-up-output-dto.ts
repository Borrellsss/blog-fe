import { RoleOutputDto } from "../roles/role-output-dto";

export interface SignUpOutputDto {
  id: number;
  username: string;
  role: RoleOutputDto;
}
