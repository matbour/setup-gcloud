import { join } from 'path';
import { endGroup, getInput, startGroup } from '@actions/core';
import { exec } from '@actions/exec';
import { isWindows } from '../lib/constants';

/**
 * Install the Google Cloud SDK.
 * @param {string} directory The target directory.
 * @returns {Promise<number>}
 */
export default async function install(directory: string): Promise<number> {
  const args = ['--usage-reporting=false', '--command-completion=false', '--path-update=false'];

  const components = getInput('components');
  if (components.length > 0) {
    args.push(`--additional-components=${components}`);
  }

  const script = isWindows ? 'install.bat' : 'install.sh';
  startGroup('Install Google Cloud SDK');
  const exit = await exec(join(directory, script), args);
  endGroup();

  return exit;
}
