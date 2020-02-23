import * as core from '@actions/core';
import { authenticate } from './authenticate';
import { download } from './download';
import { setup } from './setup';

/**
 * Install the Google Cloud SDK.
 */
try {
  await download();
  await setup();
  await authenticate();
} catch (e) {
  core.setFailed(e.message);
}
