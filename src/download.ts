import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';
import { resolve } from 'path';
import { MACOS_INSTALL_PATH, UBUNTU_INSTALL_PATH } from './constants';
import { getCloudSDKDirectory, getDownloadLink, isUbuntu } from './utils';

/**
 * Download the Google Cloud SDK archive.
 */
export async function download(): Promise<void> {
  const downloadLink = getDownloadLink();
  const downloadPath = await tc.downloadTool(downloadLink);
  const extractionPath = resolve(getCloudSDKDirectory(), '..');

  if (downloadLink.endsWith('.zip')) {
    // Windows: simply extract zip file
    await tc.extractZip(downloadPath, extractionPath);
  } else if (downloadLink.endsWith('.tar.gz')) {
    if (isUbuntu()) {
      // Ubuntu: Remove the existing installation of Google Cloud SDK
      const parentInstallDir = resolve(UBUNTU_INSTALL_PATH, '..');

      await exec.exec(`sudo rm -rf ${UBUNTU_INSTALL_PATH}`);
      await exec.exec(`sudo tar -xf ${downloadPath} -C ${parentInstallDir}`);
    } else {
      // MacOS: simply extract tar.gz file
      await io.mkdirP(MACOS_INSTALL_PATH);
      await tc.extractTar(downloadPath, MACOS_INSTALL_PATH);
    }
  } else {
    // Should never be reached
    core.setFailed(
      `Unexpected extension (expected zip or tar.gz), but got ${downloadLink}`,
    );
  }
}
