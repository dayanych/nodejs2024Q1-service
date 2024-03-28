export interface UserAccessToken {
  id: string; // uuid v4
  token: string;
  userId: string;
  expiresAt: Date;
}
