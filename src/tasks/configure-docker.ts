import { getInput } from '@actions/core';
import gcloud from '../lib/gcloud';

/**
 * Configure the docker registries using the `gcloud auth configure-docker` command.
 * @returns {Promise<void>}
 * @example Configure europe-west6-docker.pkg.dev registry
 * $ gcloud auth configure-docker europe-west6-docker.pkg.dev
 */
export default async function configureDocker() {
  const registries = getInput('configure-docker')
    .split(',')
    .reduce<string[]>((registries, raw) => {
      if (raw.length > 0) {
        registries.push(raw);
      }
      return registries;
    }, []);

  if (registries.length === 0) {
    return;
  }

  await gcloud(['auth', 'configure-docker', ...registries]);
}
