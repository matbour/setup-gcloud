import { readFileSync } from 'fs';
import { join } from 'path';
import process from 'process';
import { addPath, getInput, group, info } from '@actions/core';
import { cp, mkdirP, mv, rmRF, which } from '@actions/io';
import { cacheDir, downloadTool, extractTar, extractZip } from '@actions/tool-cache';
import {
  archMappings,
  destination,
  extensionsMappings,
  isWindows,
  latestBaseUrl,
  platformMappings,
  version,
  versionBaseUrl,
} from '../lib/constants';
import { setPath } from '../lib/gcloud';
import mapping from '../lib/mapping';

/**
 * @returns {string} The Cloud SDK download link.
 */
export async function getDownloadLink() {
  const platform = mapping(platformMappings, process.platform);
  const arch = mapping(archMappings, process.arch);
  const extension = mapping(extensionsMappings, process.platform);

  const version = getInput('version', { required: true });

  if (version === 'latest') {
    return `${latestBaseUrl}/google-cloud-sdk.${extension}`;
  }

  return `${versionBaseUrl}/google-cloud-sdk-${version}-${platform}-${arch}.${extension}`;
}

/**
 * Download the Google Cloud SDK, cache the installation path.
 * @returns {Promise<string>}
 */
export default async function download(): Promise<string | null> {
  if (version === 'local') {
    const w = await which('gcloud', true);
    console.log({ w });
    setPath(await which('gcloud', true));
    return null;
  }

  return group('Download Google Cloud SDK', async () => {
    const downloadLink = await getDownloadLink();

    info(`Downloading Google Cloud SDK from ${downloadLink}`);

    const downloadPath = await downloadTool(downloadLink);
    let extractionPath: string;

    if (downloadLink.endsWith('.zip')) {
      extractionPath = await extractZip(downloadPath);
    } else if (downloadLink.endsWith('.tar.gz')) {
      extractionPath = await extractTar(downloadPath);
    } else {
      throw new Error('Unknown extension');
    }

    /** @type {string} Read the version of the downloaded SDK. */
    const version = readFileSync(join(extractionPath, 'google-cloud-sdk', 'VERSION'), { encoding: 'utf-8' }).trim();
    const source = join(extractionPath, 'google-cloud-sdk');
    const final = destination.replace('{version}', version);

    await mkdirP(join(final, '..'));

    /**
     * Attempt to move the downloaded SDK but it might leads to errors like:
     * EXDEV: cross-device link not permitted
     * If we encounter an error, we attempt to copy the downloaded SDK instead.
     */
    try {
      await mv(source, final);
    } catch (_) {
      await cp(source, final, { recursive: true });
    }

    await cacheDir(final, 'google-cloud-sdk', version, process.arch);
    addPath(join(final, 'bin'));
    await Promise.all([rmRF(downloadPath), rmRF(extractionPath)]);

    setPath(join(final, 'bin', 'gcloud' + (isWindows ? '.cmd' : '')));

    return final;
  });
}
