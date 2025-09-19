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

export interface userData {
  id: string;
  username: string;
  email: string;
  avatar: string;
  stats: {
    gamesPlayed: number;
    gamesWon: number;
    totalPoints: number;
  }
}