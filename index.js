import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import projectsRouters from './src/routes/projects.js';

config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

app.use(projectsRouters);

app.listen(port, () => console.log('Server ON'));
