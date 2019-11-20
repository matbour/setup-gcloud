import * as exec from '@actions/exec';
import * as tc from '@actions/tool-cache';
import {getCloudSDKFolder, getDownloadLink, isUbuntu} from './utils';
import {mkdirSync} from 'fs';
import {resolve} from 'path';

export async function download() {
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
