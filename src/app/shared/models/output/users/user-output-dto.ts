import { RoleOutputDto } from "../roles/role-output-dto";
import { PostOutputDto } from "./post-output-dto";

export interface UserOutputDto {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: Date;
  email: string;
  username: string;
  avatar: string;
  blocked: boolean;
  deleted: boolean;
  createdBy: number;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
  role: RoleOutputDto;
}
