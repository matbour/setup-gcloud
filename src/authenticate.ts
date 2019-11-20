import {resolve} from "path";
import {unlinkSync, writeFileSync} from "fs";
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import {getCloudSDKFolder} from './utils';

export async function authenticate() {
    const serviceAccountKeyBase64 = core.getInput('service-account-key');
    const serviceAccountKeyJson = Buffer.from(serviceAccountKeyBase64, 'base64');
    const serviceAccountKeyPath = resolve(process.cwd(), 'gcloud.json');

    const gcloud = resolve(getCloudSDKFolder(), 'bin', 'gcloud');

    writeFileSync(serviceAccountKeyPath, serviceAccountKeyJson);
    await exec.exec(`${gcloud} auth activate-service-account --key-file=${serviceAccountKeyPath}`);
    unlinkSync(serviceAccountKeyPath);
}
