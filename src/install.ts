import {Download} from './download';
import AdmZip from 'adm-zip';
import {resolve} from 'path';
import * as core from '@actions/core';

export async function install() {
    const downloader = new Download('latest');
    const sdkFile = await downloader.download();

    if (sdkFile.endsWith('.zip')) {
        core.debug('Downloaded file is a zip, unzipping...');
        const zip = new AdmZip(resolve(process.cwd(), sdkFile));
        const destinationFolder = resolve(process.cwd(), 'google-cloud-sdk');
        zip.extractAllTo(destinationFolder, true);
        core.debug(`Unzipped to ${destinationFolder}`);
    }
}

install();
