export interface ValidationInputDto {
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
}
