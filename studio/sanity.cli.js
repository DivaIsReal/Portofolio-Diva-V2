const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your_project_id';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default {
  api: {
    projectId,
    dataset,
  },
};
