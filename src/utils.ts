import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { resolve } from 'path';
import {
  INSTALL_DIRECTORY,
  UBUNTU_INSTALL_PATH,
  WINDOWS_INSTALL_PATH,
} from './constants';

export function isWindows(): boolean {
  return process.platform === 'win32';
}

export function isMacOS(): boolean {
  return process.platform === 'darwin';
}

export function isUbuntu(): boolean {
  return process.platform === 'linux';
}

export function getCloudSDKFolder(): string {
  if (isWindows()) {
    return WINDOWS_INSTALL_PATH;
  } else if (isUbuntu()) {
    return UBUNTU_INSTALL_PATH;
  } else {
    const home = process.env.HOME ? process.env.HOME : process.cwd();
    return resolve(home, INSTALL_DIRECTORY);
  }
}

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

export async function gcloud(
  args: string[],
  options: any = undefined,
): Promise<void> {
  const gcloudPath = resolve(
    getCloudSDKFolder(),
    'bin',
    'gcloud' + (isWindows() ? '.cmd' : ''),
  );
  await exec.exec(gcloudPath, args, options);
}
