import { Router } from 'express';
import { login } from '../controllers/goLogin.js';

export const route = Router();

route.post('/login', login);
// route.post('/register', register);
