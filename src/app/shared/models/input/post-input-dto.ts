export interface PostInputDto {
  title: string;
  content: string;
  valid: boolean | null;
  category: number | null;
  tags: Array<number>;
}
