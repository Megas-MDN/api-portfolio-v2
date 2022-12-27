import Projects from '../models/projects.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Projects.find().sort({ _id: -1 });
    if (!projects) {
      return res
        .status(404)
        .send({ message: 'Projects not found', projects: null });
    }
    res.status(200).send({ message: 'Projects found successfully', projects });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error ', error });
  }
};
