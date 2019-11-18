import {Download} from './download';
import {resolve} from 'path';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import {unlinkSync, writeFileSync} from 'fs';

export async function install() {
    const downloader = new Download('latest');
    const sdkFile = await downloader.download();
    const destinationFolder = resolve(process.cwd(), 'google-cloud-sdk');

    if (sdkFile.endsWith('.zip')) {
        await exec.exec(`7z e -y ${sdkFile} -o${destinationFolder} -r`);
    } else {
        await exec.exec(`tar -xf ${sdkFile}`);
    }

    const installScript = resolve(destinationFolder, 'install.') + (process.platform === 'win32' ? 'bat' : 'sh');
    await exec.exec(installScript + ' --path-update=false --usage-reporting=false --command-completion=false');

    // Add Google Cloud SDK bin directory to path
    const bin = resolve(destinationFolder, 'bin');
    core.addPath(bin);

    const gcloud = resolve(bin, 'gcloud');

    // Setup service account
    const serviceAccountKeyBase64 = core.getInput('service-account-key');
    const serviceAccountKeyJson = Buffer.from(serviceAccountKeyBase64, 'base64');
    const serviceAccountKeyPath = resolve(process.cwd(), 'gcloud.json');

    writeFileSync(serviceAccountKeyPath, serviceAccountKeyJson);
    await exec.exec(`${gcloud} auth activate-service-account --key-file=${serviceAccountKeyPath}`);
    unlinkSync(serviceAccountKeyPath);
}

install();
