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

export const sendNewProject = async (req, res, next) => {
  const { imgsrc, title, text, view, source, id } = req.body;

  if (!imgsrc || !title || !text || !view || !source) {
    return res
      .status(400)
      .send({ message: 'All params is required to create a project' });
  }
  const newProject = await Projects.create({
    imgsrc,
    title,
    text,
    view,
    source,
    userId: id,
  });
  res.status(201).send({ message: 'New project created', project: newProject });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error ', error });
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { idProject } = req.params;
    const { imgsrc, title, text, view, source } = req.body;

    if (!imgsrc && !title && !text && !view && !source) {
      return res.status(400).send({ message: 'No params to update' });
    }
    const project = await Projects.findByIdAndUpdate(
      { _id: idProject },
      { imgsrc, title, text, view, source },
      { rawResult: true }
    );

    res.status(200).send({
      message: 'Projects updated successfully',
      project: { imgsrc, title, text, view, source },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error project not updated', error });
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { idProject } = req.params;
    const project = await Projects.findByIdAndDelete({ _id: idProject });
    res.status(200).send({ message: 'Project deleted', project });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error project not deleted', error });
  }
};
