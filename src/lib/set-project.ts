import gcloud from './gcloud';

/**
 * Execute `gcloud config set project {projectId}`
 * @param {string} projectId
 * @returns {Promise<number>}
 */
export default function setProject(projectId: string): Promise<number> {
  if (projectId.length === 0) {
    // No project was passed, skipping
    return Promise.resolve(0);
  }

  return gcloud(['config', 'set', 'project', projectId]);
}
