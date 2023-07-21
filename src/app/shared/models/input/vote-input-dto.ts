export interface VoteInputDto {
  user: number;
  post: number;
  liked: boolean | null;
}
