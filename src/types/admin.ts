export interface User {
  id: string;
  username: string;
  nickname: string;
  email: string;
  admin: boolean;
  banned: boolean;
  banTimeout?: string | null;
}
