export interface UserRefreshToken {
  id: string; // uuid v4
  token: string;
  userId: string;
  expiresAt: string;
}
