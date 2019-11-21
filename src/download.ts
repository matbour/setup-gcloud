import * as tc from '@actions/tool-cache';
import { getCloudSDKFolder, getDownloadLink } from './utils';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

/**
 * Download the Google Cloud SDK archive.
 */
export async function download(): Promise<void> {
  const downloadLink = getDownloadLink();
  const downloadPath = await tc.downloadTool(downloadLink);
  const extractionPath = resolve(getCloudSDKFolder(), '..');

  mkdirSync(getCloudSDKFolder());

  if (downloadLink.endsWith('.zip')) {
    await tc.extractZip(downloadPath, extractionPath);
  } else if (downloadLink.endsWith('.tar.gz')) {
    await tc.extractTar(downloadPath, extractionPath);
  }
}
