import { RoleOutputDto } from "../role/role-output-dto";

export interface UserOutputDto {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  avatar: string;
  blocked: boolean;
  deleted: boolean;
  createdBy: number;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
  roles: Array<RoleOutputDto>;
}
