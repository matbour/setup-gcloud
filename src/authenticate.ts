import * as core from '@actions/core';
import { unlinkSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { gcloud } from './utils';

/**
 * Authenticate the Google Cloud SDK.
 */
export async function authenticate(): Promise<void> {
  // If service account key is not provided, skip the authentication
  if (!core.getInput('service-account-key')) {
    core.warning(
      'No service-account-key input was passed.' +
        'If it is intentional, you can safely ignore this warning.',
    );
    return;
  }

  // Write the service account key
  const serviceAccountKeyBase64 = core.getInput('service-account-key');
  const serviceAccountKeyJson = Buffer.from(serviceAccountKeyBase64, 'base64');
  const serviceAccountKeyPath = resolve(process.cwd(), 'gcloud.json');
  writeFileSync(serviceAccountKeyPath, serviceAccountKeyJson);

  // Activate the service account
  await gcloud([
    'auth',
    'activate-service-account',
    `--key-file=${serviceAccountKeyPath}`,
  ]);

  // Configure Docker if necessary
  if (core.getInput('configure-docker')) {
    await gcloud(['--quiet', 'auth', 'configure-docker']);
  }

  // Remove the service account key
  unlinkSync(serviceAccountKeyPath);
}
