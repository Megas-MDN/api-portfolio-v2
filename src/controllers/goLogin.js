import { User } from '../models/User.js';
import createToken from '../jwt/createToken.js';
import bcrypt from 'bcrypt';

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'Email and password are required' });
    }
    // const user = await User.findOne({ email });
    const newUser = await User.create({ email, password });
    const token = createToken(newUser._id, 300);
    res.status(201).send({ message: 'User created', user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error to register', error });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found', user: null });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ message: 'Invalid Login', user: null, token: null });
    }
    const token = createToken(user._id, 300);
    res.status(200).send({ message: 'Login OK', user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error login', error });
  }
};
