import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const getToken = (data, secret, expiresTime) => {
  return jwt.sign(data, secret, { expiresIn: expiresTime });
};

const getHash = (plainText) => {
  return bcrypt.hashSync(plainText, 10);
};

const checkHash = (plainText, hash) => {
  return bcrypt.compareSync(plainText, hash);
};

export {getToken, getHash, checkHash};