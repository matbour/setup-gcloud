import { randomBytes } from 'crypto';
import { unlinkSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { resolve } from 'path';
import { endGroup, getInput, startGroup, warning } from '@actions/core';
import gcloud from '../lib/gcloud';
import setProject from '../lib/set-project';

/**
 * Activate the service account using its JSON key file.
 * And try to set the project id from the key file if the project is set to "auto".
 */
export default async function auth() {
  startGroup('Authentication');
  const serviceAccountKeyBase64 = getInput('service-account-key');

  if (serviceAccountKeyBase64.length === 0) {
    warning('No service-account-key input was passed. If it is intentional, you can safely ignore this warning.');
    return;
  }

  const serviceAccountKeyJson = Buffer.from(serviceAccountKeyBase64, 'base64').toString();
  const serviceAccountKeyPath = resolve(tmpdir(), `${randomBytes(16).toString('hex')}.json`);
  writeFileSync(serviceAccountKeyPath, serviceAccountKeyJson);

  await gcloud(['auth', 'activate-service-account', `--key-file=${serviceAccountKeyPath}`]);

  // Remove the service account key
  unlinkSync(serviceAccountKeyPath);

  // Configure the default project
  if (getInput('project') === 'auto' && getInput('service-account-key') !== '') {
    // Project will be read from the service account key
    const serviceAccountKey: { project_id: string } = JSON.parse(serviceAccountKeyJson.toString());

    if (serviceAccountKey.hasOwnProperty('project_id')) {
      // If key has a project_id field, use it to set the default project
      await setProject(serviceAccountKey.project_id);
    } else {
      warning(
        `You gave a service account key, but it does not have the "project_id" key. Thus, the default project cannot be configured. Your service account key might malformed.`,
      );
    }
  } else {
    await setProject(getInput('project'));
  }
  endGroup();
}
