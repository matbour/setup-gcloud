import * as tc from '@actions/tool-cache';
import {getCloudSDKFolder, getDownloadLink} from './utils';
import {mkdirSync} from 'fs';

export async function download() {
    const downloadLink = getDownloadLink();
    const downloadPath = await tc.downloadTool(downloadLink);

    mkdirSync(getCloudSDKFolder());

    if (downloadLink.endsWith('.zip')) {
        await tc.extractZip(downloadPath, getCloudSDKFolder());
    } else if (downloadLink.endsWith('.tar.gz')) {
        await tc.extractTar(downloadPath, getCloudSDKFolder());
    }
}
