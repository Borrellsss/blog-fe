import { RoleOutputDto } from "../role/role-output-dto";

export interface SignUpOutputDto {
  id: number;
  username: string;
  roles: Array<RoleOutputDto>;
}
