import {resolve} from "path";
import * as core from '@actions/core';

export function isWindows() {
    return process.platform === 'win32';
}

export function isMacOS() {
    return process.platform === 'darwin';
}

export function isUbuntu() {
    return process.platform === 'linux';
}

export function getCloudSDKFolder(): string {
    if (isWindows()) {
        return 'C:\\Program Files\\Google Cloud SDK';
    } else if (isUbuntu()) {
        return '/home/runner/google-cloud-sdk';
    } else {
        const home = process.env.HOME ? process.env.HOME : process.cwd();
        return resolve(home, 'google-cloud-sdk');
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
