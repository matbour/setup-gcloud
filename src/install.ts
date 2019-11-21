import * as core from '@actions/core';
import { authenticate } from './authenticate';
import { download } from './download';
import { setup } from './setup';
import { isWindows } from './utils';

/**
 * Install the Google Cloud SDK.
 */
export async function install(): Promise<void> {
  try {
    // Currently, Windows is disabled because the installer does not work properly
    if (isWindows()) {
      core.error(
        'This action does not support Windows for now. PR are welcome!',
      );
    }

    await download();
    await setup();
    await authenticate();
  } catch (e) {
    core.setFailed(e.message);
  }
}

install()
  .then(() => {
    core.info('Installation succeeded');
  })
  .catch(() => {
    core.error('Installation failed');
  });
