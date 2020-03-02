import * as core from '@actions/core';
import { authenticate } from './authenticate';
import { download } from './download';
import { setup } from './setup';

/**
 * Install the Google Cloud SDK.
 */
try {
  (async () => {
    await download();
    await setup();
    await authenticate();
  })();
} catch (exception) {
  core.setFailed(exception.message);
}
