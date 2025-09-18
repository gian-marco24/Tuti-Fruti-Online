export interface User {
  _id?: string | T;
  username: string;
  email: string;
  password: string;
  avatar?: string
  stats?: {
    gamesPlayed: number;
    gamesWon: number;
    totalPoints: number;
  };
  createdAt?: Date;
}