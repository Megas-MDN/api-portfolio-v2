import { Router } from 'express';
import { getProjects } from '../controllers/projects.js';

const projectsRouters = Router();

projectsRouters.get('/', getProjects);

export default projectsRouters;
