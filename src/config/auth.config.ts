export const getAuthConfig = () => ({
  access: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  },
  refresh: {
    secret: process.env.JWT_SECRET_REFRESH_KEY,
    expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
  },
});
