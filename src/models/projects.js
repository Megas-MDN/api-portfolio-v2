import mongoose from 'mongoose';

const projectsSchema = mongoose.Schema(
  {
    imgsrc: String,
    title: String,
    text: {
      type: String,
      max: 300,
    },
    view: String,
    source: String,
  },
  { timestamps: true }
);

const Projects = mongoose.model('projects', projectsSchema);

export default Projects;
