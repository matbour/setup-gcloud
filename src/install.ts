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
