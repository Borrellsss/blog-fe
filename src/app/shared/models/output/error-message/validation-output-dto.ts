export interface ValidationOutputDto {
  id: number;
  code: string;
  field: string;
  notNull: boolean;
  notEmpty: boolean;
  min: number;
  max: number;
  regex: string;
  minUpperCaseLetters: number;
  minLowerCaseLetters: number;
  minDigits: number;
  minSpecialCharacters: number;
  createdBy: number;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
}
