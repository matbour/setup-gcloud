import { homedir } from 'os';
import { resolve } from 'path';
import { getInput } from '@actions/core';

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
