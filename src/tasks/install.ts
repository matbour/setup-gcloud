import { join } from 'path';
import { getInput, group } from '@actions/core';
import { exec } from '@actions/exec';
import { which } from '@actions/io';
import { isWindows } from '../lib/constants';

/**
 * Install the Google Cloud SDK.
 * @param {string} directory The target directory.
 * @returns {Promise<number>}
 */
export default async function install(directory: string): Promise<number> {
  return group('Install Google Cloud SDK', async () => {
    const args = ['--usage-reporting=false', '--command-completion=false', '--path-update=false'];

    const components = getInput('components');
    if (components.length > 0) {
      args.push(`--additional-components=${components}`);
    }

    const script = isWindows ? 'install.bat' : 'install.sh';
    return await exec(join(directory, script), args, {
      env: {
        CLOUDSDK_PYTHON: await which('python'),
        // INSTALL_PYTHON: 'true',
      },
    });
  });
}
