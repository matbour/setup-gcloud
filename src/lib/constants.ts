import { homedir } from 'os';
import { resolve } from 'path';
import * as process from 'process';
import { getInput } from '@actions/core';
import mapping from './mapping';

/** @type {boolean} If we are running on Windows */
export const isWindows = process.platform === 'win32';
/** @type {boolean} If we are running on MacOS */
export const isMacOS = process.platform === 'darwin';
/** @type {boolean} If we are running on Linux */
export const isLinux = process.platform === 'linux';

/** @type {string} The requested version. */
export const requestedVersion = getInput('version', { required: true });

/** @type {string} The destination directory. */
export const destination = resolve(getInput('destination', { required: true }).replace(/~/g, homedir()));

export const platformMappings: Partial<Record<typeof process.platform, string>> = {
  linux: 'linux',
  win32: 'windows',
  darwin: 'darwin',
};

export const extensionsMappings: Partial<Record<typeof process.platform, string>> = {
  linux: 'tar.gz',
  win32: 'zip',
  darwin: 'tar.gz',
};

export const archMappings: Record<typeof process.arch, string> = {
  x32: 'x86',
  x64: 'x86_64',
  arm: 'arm',
  arm64: 'arm',
};

export const latestBaseUrl = 'https://dl.google.com/dl/cloudsdk/channels/rapid';
export const versionBaseUrl = 'https://storage.googleapis.com/cloud-sdk-release';
