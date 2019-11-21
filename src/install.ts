import * as core from '@actions/core';
import { download } from './download';
import { setup } from './setup';
import { authenticate } from './authenticate';
import { isWindows } from './utils';

export async function install() {
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
