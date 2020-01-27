import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { ExecOptions } from '@actions/exec/lib/interfaces';
import { resolve } from 'path';
import {
  INSTALL_DIRECTORY,
  MACOS_INSTALL_PATH,
  UBUNTU_INSTALL_PATH,
  WINDOWS_INSTALL_PATH,
} from './constants';

/**
 * Check if the runner is Windows-based.
 */
export function isWindows(): boolean {
  return process.platform === 'win32';
}

/**
 * Check if the runner is MacOS-based.
 */
export function isMacOS(): boolean {
  return process.platform === 'darwin';
}

/**
 * Check if the runner is Ubuntu-based.
 */
export function isUbuntu(): boolean {
  return process.platform === 'linux';
}

/**
 * Get the Google Cloud SDK installation directory.
 */
export function getCloudSDKDirectory(): string {
  if (isWindows()) {
    return WINDOWS_INSTALL_PATH;
  } else if (isUbuntu()) {
    return UBUNTU_INSTALL_PATH;
  } else {
    return MACOS_INSTALL_PATH;
  }
}

/**
 * Get the Google Cloud SDK download link
 */
export function getDownloadLink(): string {
  const baseUrl = 'https://dl.google.com/dl/cloudsdk/channels/rapid';
  const version = core.getInput('version');

  if (version === 'latest') {
    if (isWindows()) {
      return `${baseUrl}/google-cloud-sdk.zip`;
    } else {
      return `${baseUrl}/google-cloud-sdk.tar.gz`;
    }
  }

  if (isWindows()) {
    return `${baseUrl}/downloads/google-cloud-sdk-${version}-windows-x86_64.zip`;
  } else if (isMacOS()) {
    return `${baseUrl}/downloads/google-cloud-sdk-${version}-darwin-x86_64.tar.gz`;
  } else {
    return `${baseUrl}/downloads/google-cloud-sdk-${version}-linux-x86_64.tar.gz`;
  }
}

/**
 * Execute a gcloud command
 * @param args The gcloud args
 * @param options The command options
 */
export async function gcloud(
  args: string[],
  options: ExecOptions | undefined = undefined,
): Promise<void> {
  let gcloudPath = resolve(
    getCloudSDKDirectory(),
    'bin',
    'gcloud' + (isWindows() ? '.cmd' : ''),
  );

  if (isWindows()) {
    // Windows installation directory is C:\Program Files and thus need to be escaped
    gcloudPath = gcloudPath.replace(
      getCloudSDKDirectory(),
      `"${getCloudSDKDirectory()}"`,
    );
  }

  args.unshift('--quiet'); // Add quiet to all commands

  await exec.exec(gcloudPath, args, options);
}
