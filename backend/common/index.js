import jwt from 'json';
import dotenv from 'dotenv';

dotenv.config();

const getToken = (data) => {
  return jwt.sign(data, process.env.jwt_secret, { expiresIn: '1h' });
};

export {getToken};