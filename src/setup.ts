import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { execSync } from 'child_process';
import { resolve } from 'path';
import { gcloud, getCloudSDKFolder, isWindows } from './utils';

/**
 * Setup the Google Cloud SDK.
 */
export async function setup(): Promise<void> {
  const installScriptExtension = isWindows() ? 'bat' : 'sh';
  const installScript = resolve(
    getCloudSDKFolder(),
    `install.${installScriptExtension}`,
  );

  const args = [
    '--usage-reporting=false',
    '--command-completion=false',
    '--path-update=false',
    '--usage-reporting=false',
    '--quiet',
  ];

  if (core.getInput('components')) {
    args.push('--additional-components=' + core.getInput('components'));
  }

  if (isWindows()) {
    // @actions/exec does not exit on windows
    execSync(`"${installScript}" ${args.join(' ')}`, { stdio: 'inherit' });
  } else {
    await exec.exec(installScript, args);
  }

  if (
    core.getInput('project') === 'auto' &&
    core.getInput('service-account-key')
  ) {
    // Project will be read from the service account key
    const buffer = new Buffer(core.getInput('service-account-key'), 'base64');
    const serviceAccountKey: { project_id: string } = JSON.parse(
      buffer.toString(),
    );

    if (serviceAccountKey.hasOwnProperty('project_id')) {
      await gcloud(['config', 'set', 'project', serviceAccountKey.project_id]);
    }
  } else if (core.getInput('project') !== 'none') {
    // Project was passed as input
    await gcloud(['config', 'set', 'project', core.getInput('project')]);
  }

  const binPath = resolve(getCloudSDKFolder(), 'bin');
  core.addPath(binPath);
}
