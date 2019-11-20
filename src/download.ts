import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as tc from '@actions/tool-cache';
import {getCloudSDKFolder, getDownloadLink, isMacOS, isWindows} from './utils';
import {resolve} from "path";

export async function download() {
    const downloadLink = getDownloadLink();
    const downloadPath = await tc.downloadTool(downloadLink);

    if (downloadLink.endsWith('.zip')) {
        await tc.extractZip(downloadPath, getCloudSDKFolder());
    } else if (downloadLink.endsWith('.tar.gz')) {
        await tc.extractTar(downloadPath, getCloudSDKFolder());
    }
}
