import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const getToken = (data) => {
  return jwt.sign(data, process.env.jwt_secret, { expiresIn: '1h' });
};

const getHash = (plainText) => {
  return bcrypt.hashSync(plainText, 10);
};

const checkHash = (plainText, hash) => {
  return bcrypt.compareSync(plainText, hash);
};

export {getToken, getHash, checkHash};