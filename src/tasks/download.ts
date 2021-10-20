import { readFileSync } from 'fs';
import { join } from 'path';
import { addPath, group } from '@actions/core';
import { cp, mkdirP, mv, rmRF, which } from '@actions/io';
import { cacheDir, downloadTool, extractTar, extractZip } from '@actions/tool-cache';
import { destination, downloadLink, isWindows, version } from '../lib/constants';
import { setPath } from '../lib/gcloud';

/**
 * Download the Google Cloud SDK, cache the installation path.
 * @returns {Promise<string>}
 */
export default async function download(): Promise<string | null> {
  if (version === 'local') {
    setPath(await which('gcloud', true));
    return null;
  }

  return group('Download Google Cloud SDK', async () => {
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
