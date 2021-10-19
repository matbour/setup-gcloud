import { homedir } from 'os';
import { resolve } from 'path';
import { getInput } from '@actions/core';

/** @type {boolean} If we are running on Windows */
export const isWindows = process.platform === 'win32';
/** @type {boolean} If we are running on MacOS */
export const isMacOS = process.platform === 'darwin';
/** @type {boolean} If we are running on Linux */
export const isLinux = process.platform === 'linux';

/** @type {string} The requested version. */
export const version = getInput('version', { required: true });

/** @type {string} The destination directory. */
export const destination = resolve(getInput('destination', { required: true }).replace(/~/g, homedir()));

/** @type {string} The Cloud SDK download link. */
export const downloadLink: string = (() => {
  const baseUrl = 'https://dl.google.com/dl/cloudsdk/channels/rapid';

  const version = getInput('version', { required: true });
  if (version === 'latest') {
    if (isWindows) {
      return `${baseUrl}/google-cloud-sdk.zip`;
    } else {
      return `${baseUrl}/google-cloud-sdk.tar.gz`;
    }
  }

  if (isWindows) {
    return `${baseUrl}/downloads/google-cloud-sdk-${version}-windows-x86_64.zip`;
  } else if (isMacOS) {
    return `${baseUrl}/downloads/google-cloud-sdk-${version}-darwin-x86_64.tar.gz`;
  } else {
    return `${baseUrl}/downloads/google-cloud-sdk-${version}-linux-x86_64.tar.gz`;
  }
})();
