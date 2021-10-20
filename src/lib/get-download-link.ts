import { requestedVersion } from './constants';

/** @type {string} The base url to download the latest version of the Google Cloud SDK */
export const latestBaseUrl = 'https://dl.google.com/dl/cloudsdk/channels/rapid';
/** @type {string} The base url to download a static version of the Google Cloud SDK */
export const versionBaseUrl = 'https://storage.googleapis.com/cloud-sdk-release';

/**
 * @returns {string} The Cloud SDK download link.
 */
export default function getDownloadLink(): string {
  let platform: string;
  let arch: string;
  let extension: string;

  switch (process.platform) {
    case 'linux':
      platform = 'linux';
      extension = 'tar.gz';
      break;
    case 'win32':
      platform = 'windows';
      extension = 'zip';
      break;
    case 'darwin':
      platform = 'darwin';
      extension = 'tar.gz';
      break;
    default:
      throw new Error(`Unsupported platform: ${process.platform}`);
  }

  switch (process.arch) {
    case 'x32':
      arch = 'x86';
      break;
    case 'x64':
      arch = 'x86_64';
      break;
    case 'arm':
    case 'arm64':
      arch = 'arm';
      break;
    default:
      throw new Error(`Unsupported arch: ${process.arch}`);
  }

  if (requestedVersion === 'latest') {
    return `${latestBaseUrl}/google-cloud-sdk.${extension}`;
  }

  return `${versionBaseUrl}/google-cloud-sdk-${requestedVersion}-${platform}-${arch}.${extension}`;
}
