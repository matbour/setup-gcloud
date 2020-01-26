import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';
import { resolve } from 'path';
import { UBUNTU_INSTALL_PATH } from './constants';
import { getCloudSDKFolder, getDownloadLink, isUbuntu } from './utils';

/**
 * Download the Google Cloud SDK archive.
 */
export async function download(): Promise<void> {
  const downloadLink = getDownloadLink();
  const downloadPath = await tc.downloadTool(downloadLink);
  const extractionPath = resolve(getCloudSDKFolder(), '..');

  await io.mkdirP(getCloudSDKFolder());

  if (downloadLink.endsWith('.zip')) {
    await tc.extractZip(downloadPath, extractionPath);
  } else if (downloadLink.endsWith('.tar.gz')) {
    // Remove the existing installation of Google Cloud SDK on Ubuntu Runners
    if (isUbuntu()) {
      const cleanupScript = [
        `sudo rm -rf ${UBUNTU_INSTALL_PATH}`,
        `sudo tar -xf ${downloadPath} -C ${resolve(UBUNTU_INSTALL_PATH, '..')}`,
      ];

      for (const line of cleanupScript) {
        await exec.exec(line);
      }
    } else {
      await tc.extractTar(downloadPath, extractionPath);
    }
  }
}
