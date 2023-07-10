export interface SignUpInputDto {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  password: string;
  avatar: string;
  roles: Set<number>;
}