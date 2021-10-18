import * as core from '@actions/core';
import { types } from 'util';
import { authenticate } from './authenticate';
import { download } from './download';
import { setup } from './setup';
import { isUbuntu } from './utils';
import 'source-map-support/register';

/**
 * Install the Google Cloud SDK.
 */
try {
  (async (): Promise<void> => {
    if (core.getInput('version') === 'local') {
      if (!isUbuntu()) {
        throw new Error('Usage if the local Google Cloud SDK is only available on Ubuntu');
      }
    } else {
      await download();
      await setup();
    }

    await authenticate();
  })();
} catch (exception) {
  if (types.isNativeError(exception)) {
    core.setFailed(exception.message);
  }
}
