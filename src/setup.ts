import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { execSync } from 'child_process';
import { resolve } from 'path';
import { getCloudSDKDirectory, isMacOS, isUbuntu, isWindows } from './utils';

/**
 * Setup the Google Cloud SDK by running the install script.
 */
export async function setup(): Promise<void> {
  const installScriptExtension = isWindows() ? 'bat' : 'sh';
  const installScript = resolve(getCloudSDKDirectory(), `install.${installScriptExtension}`);

  const args = [
    '--usage-reporting=false',
    '--command-completion=false',
    '--path-update=false',
    '--usage-reporting=false',
    '--quiet',
  ];

  if (core.getInput('components') !== '') {
    args.push('--additional-components=' + core.getInput('components'));
  }

  if (isUbuntu()) {
    /*
     * On Ubuntu, since we extracted the SDK to a protected directory, we have also to run the installer as root, which
     * has side-effects on the user $HOME folder.
     */
    await exec.exec(`sudo ${installScript}`, args);

    const user = process.env.USER || '';
    const home = process.env.HOME || '';
    await exec.exec(`sudo chown -R ${user} ${home}`);
  } else if (isMacOS()) {
    // On MacOS, we simply have to run the install script
    await exec.exec(installScript, args);
  } else if (isWindows()) {
    // @actions/exec does not exit on windows
    await exec.exec(`"${installScript}" ${args.join(' ')}`);
  } else {
    // Should never be reached
    core.setFailed(`Unexpected os platform, got: ${process.platform}`);
  }

  const binPath = resolve(getCloudSDKDirectory(), 'bin');
  core.addPath(binPath);
}
