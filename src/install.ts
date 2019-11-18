import {Download} from './download';
import {resolve} from 'path';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import {writeFileSync} from 'fs';

export async function install() {
    const downloader = new Download('latest');
    const sdkFile = await downloader.download();
    const destinationFolder = resolve(process.cwd(), 'google-cloud-sdk');

    if (sdkFile.endsWith('.zip')) {
        await exec.exec(`7z e -y ${sdkFile} -oc:${destinationFolder}`);
    } else {
        await exec.exec(`tar -xf ${sdkFile}`);
    }

    if (process.platform === 'win32') {
        await exec.exec('dir');
        await exec.exec(resolve(destinationFolder, 'install.bat --disable-prompts'));
    } else if (process.platform == 'darwin') {
        await exec.exec(resolve(destinationFolder, 'install.sh'));
    } else {
        await exec.exec(resolve(destinationFolder, 'install.sh --disable-prompts'));
    }

    const serviceAccountKeyBase64 = core.getInput('service-account-key');
    const serviceAccountKeyJson = Buffer.from(serviceAccountKeyBase64, 'base64');
    const serviceAccountKeyPath = resolve(process.cwd(), 'gcloud.json');
    writeFileSync(serviceAccountKeyPath, serviceAccountKeyJson);
    await exec.exec(`gcloud auth activate-service-account --key-file=${serviceAccountKeyPath}`);
}

try {
    install();
} catch (error) {
    core.setFailed(error.message);
}
