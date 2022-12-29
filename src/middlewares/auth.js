import { User } from '../models/User.js';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

const validaToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(200).send({ message: 'Token not valid', token: null });
    }
    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .send({ message: 'Token not valid in verify', token: null });
      } else {
        const user = await User.findById(decoded.id);
        if (!user) {
          return res
            .status(404)
            .send({ message: 'User not found', user: null });
        }
        req.body.id = decoded.id;
        req.body.user = user;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error ', error });
  }
};

export default validaToken;
