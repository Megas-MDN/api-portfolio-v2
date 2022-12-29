import { Router } from 'express';
import {
  deleteProject,
  getProjects,
  sendNewProject,
  updateProject,
} from '../controllers/projects.js';
import validaToken from '../middlewares/auth.js';

const projectsRouters = Router();

projectsRouters.patch('/:idProject', validaToken, updateProject);
projectsRouters.delete('/:idProject', validaToken, deleteProject);
projectsRouters.post('/', validaToken, sendNewProject);

projectsRouters.get('/', getProjects);

export default projectsRouters;
