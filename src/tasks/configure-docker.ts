import { getInput, group } from '@actions/core';
import gcloud from '../lib/gcloud';

/**
 * Configure the docker registries using the `gcloud auth configure-docker` command.
 * @returns {Promise<void>}
 * @example Configure europe-west6-docker.pkg.dev registry
 * $ gcloud auth configure-docker europe-west6-docker.pkg.dev
 */
export default async function configureDocker(): Promise<void> {
  const registries = getInput('configure-docker')
    .split(',')
    .reduce<string[]>((acc, raw) => {
      if (raw.length > 0) {
        acc.push(raw);
      }

      return acc;
    }, []);

  if (registries.length === 0) {
    return;
  }

  await group('Docker registries configuration', () => {
    return gcloud(['auth', 'configure-docker', ...registries, '--quiet']);
  });
}
