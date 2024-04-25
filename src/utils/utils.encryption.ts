import * as bycrypt from 'bcrypt';
export const generateHash = async (password: string) => {
  const saltRounds = await bycrypt.genSalt(10);
  return bycrypt.hash(password, saltRounds);
};

export const isPasswordValidate = async (password: string, hashed: string) =>
  await bycrypt.compare(password, hashed);

export const isTokenExpired = (expirationTime: number) => {
  const currentTime = Math.floor(Date.now() / 1000);
  return expirationTime < currentTime;
};
