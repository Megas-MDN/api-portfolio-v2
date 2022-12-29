import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import projectsRouters from './src/routes/projects.js';
import { route as loginRoute } from './src/routes/login.js';
import mongoose from 'mongoose';
// import Projects from './src/models/projects.js';
// import { projects as preProjects } from './src/database/preload.js';

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
app.use(loginRoute);

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log('Server port :: ', port));
    console.log('DB connected');
    // Add data
    // Projects.insertMany(preProjects);
  })
  .catch((err) => console.log('Error to connect DB :: ', err));
