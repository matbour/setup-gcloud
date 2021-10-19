import { readFileSync } from 'fs';
import { join } from 'path';
import { addPath } from '@actions/core';
import { mkdirP, mv, rmRF } from '@actions/io';
import { cacheDir, downloadTool, extractTar, extractZip } from '@actions/tool-cache';
import { destination, downloadLink, isWindows } from '../lib/constants';
import { setPath } from '../lib/gcloud';

/**
 * Download the Google Cloud SDK, cache the installation path.
 * @returns {Promise<string>}
 */
export default async function download(): Promise<string> {
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
  const final = destination.replace('{version}', version);

  await mkdirP(join(final, '..'));
  await mv(join(extractionPath, 'google-cloud-sdk'), final);
  await cacheDir(final, 'google-cloud-sdk', version, process.arch);
  addPath(join(final, 'bin'));
  await Promise.all([rmRF(downloadPath), rmRF(extractionPath)]);

  setPath(join(final, 'bin', 'gcloud' + (isWindows ? '.cmd' : '')));

  return final;
}
