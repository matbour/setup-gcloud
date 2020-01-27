import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';
import { resolve } from 'path';
import { UBUNTU_INSTALL_PATH } from './constants';
import { getCloudSDKDirectory, getDownloadLink, isUbuntu } from './utils';

/**
 * Download the Google Cloud SDK archive.
 */
export async function download(): Promise<void> {
  const downloadLink = getDownloadLink();
  const downloadPath = await tc.downloadTool(downloadLink);
  const extractionPath = resolve(getCloudSDKDirectory(), '..');

  await io.mkdirP(getCloudSDKDirectory());

  if (downloadLink.endsWith('.zip')) {
    // Extract .zip (Windows).
    await tc.extractZip(downloadPath, extractionPath);
  } else if (downloadLink.endsWith('.tar.gz')) {
    if (isUbuntu()) {
      // Remove the existing installation of Google Cloud SDK on Ubuntu Runners
      const parentInstallDir = resolve(UBUNTU_INSTALL_PATH, '..');

      await exec.exec(`sudo rm -rf ${UBUNTU_INSTALL_PATH}`);
      await exec.exec(`sudo tar -xf ${downloadPath} -C ${parentInstallDir}`);
    } else {
      // Simply extract the tar.gz archive
      await tc.extractTar(downloadPath, extractionPath);
    }
  } else {
    // Should never be reached
    core.setFailed(
      `Unexpected extension (expected zip or tar.gz), but got ${downloadLink}`,
    );
  }
}
