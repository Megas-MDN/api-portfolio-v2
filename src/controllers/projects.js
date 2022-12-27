import { exempleDatabase } from '../database/index.js';

export const getProjects = (req, res) => {
  res
    .status(200)
    .send({ message: 'Projects found', projects: [exempleDatabase] });
};
