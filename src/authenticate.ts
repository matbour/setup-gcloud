import * as core from '@actions/core';
import { unlinkSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { gcloud } from './utils';

/**
 * Configure the default Google Cloud project.
 * @param projectId
 */
function configureProject(projectId: string): Promise<void> {
  return gcloud(['config', 'set', 'project', projectId]);
}

/**
 * Configure the default Google Cloud project from the GitHub inputs.
 */
async function configureProjectFromInput(): Promise<void> {
  if (!['', 'none', 'auto'].includes(core.getInput('project'))) {
    return await configureProject(core.getInput('project'));
  } else {
    return;
  }
}

/**
 * Configure Docker credentials for Google Cloud Registry
 */
async function configureDocker(): Promise<void> {
  const input = core.getInput('configure-docker');

  if (input === 'false') {
    return;
  }

  const registries =
    input === 'true'
      ? null
      : input
          .split(',')
          .map(r => r.trim())
          .filter(r => r.length > 0)
          .join(',');

  const args = ['auth', 'configure-docker'];

  if (registries) {
    args.push(registries);
  }

  await gcloud(args);
}

/**
 * Authenticate the Google Cloud SDK.
 */
export async function authenticate(): Promise<void> {
  // If service account key is not provided, skip the authentication
  if (!core.getInput('service-account-key')) {
    core.warning('No service-account-key input was passed. If it is intentional, you can safely ignore this warning.');

    await configureProjectFromInput();
  }

  // Write the service account key
  const serviceAccountKeyBase64 = core.getInput('service-account-key');
  const serviceAccountKeyJson = Buffer.from(serviceAccountKeyBase64, 'base64').toString();
  const serviceAccountKeyPath = resolve(process.cwd(), 'gcloud.json');
  writeFileSync(serviceAccountKeyPath, serviceAccountKeyJson);

  // Activate the service account
  await gcloud(['auth', 'activate-service-account', `--key-file=${serviceAccountKeyPath}`]);

  // Remove the service account key
  unlinkSync(serviceAccountKeyPath);

  // Configure the default project
  if (core.getInput('project') === 'auto' && core.getInput('service-account-key') !== '') {
    // Project will be read from the service account key
    const serviceAccountKey: { project_id: string } = JSON.parse(serviceAccountKeyJson.toString());

    if (serviceAccountKey.hasOwnProperty('project_id')) {
      // If key has a project_id field, use it to set the default project
      await configureProject(serviceAccountKey.project_id);
    } else {
      core.warning(
        'You gave a service account key, but it does not have the "project_id" key. Thus, the default project ' +
          'cannot be configured. Your service account key might malformed.',
      );
    }
  } else {
    await configureProjectFromInput();
  }

  // Configure Docker if necessary
  await configureDocker();
}
