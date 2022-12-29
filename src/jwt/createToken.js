import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const createToken = (id, timeExpire) =>
  jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: timeExpire });

export default createToken;
