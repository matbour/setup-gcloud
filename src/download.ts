import {existsSync} from 'fs';
import * as core from '@actions/core';
import {resolve} from 'path';
import * as exec from '@actions/exec';

export class Download {
    private readonly BASE_URL: string = 'https://dl.google.com/dl/cloudsdk/channels/rapid';
    private sdkUrl: string = this.BASE_URL;

    constructor(private version: string) {
        this.setSdkDownloadUrl();
    }

    async download(): Promise<string> {
        const extension = this.sdkUrl.endsWith('.zip') ? 'zip' : 'tar.gz';
        const destination = resolve(process.cwd(), `google-cloud-sdk.${extension}`);

        if (existsSync(destination)) {
            return destination;
        }

        core.debug(`Downloading ${this.sdkUrl}`);
        await exec.exec(`curl -s -o ${destination} ${this.sdkUrl}`);
        core.debug(`Downloaded ${this.sdkUrl}`);

        return destination;
    }

    setSdkDownloadUrl(): void {
        if (this.version === 'latest') {
            if (process.platform === 'win32') {
                this.sdkUrl = `${this.BASE_URL}/google-cloud-sdk.zip`;
            } else {
                this.sdkUrl = `${this.BASE_URL}/google-cloud-sdk.tar.gz`;
            }
        } else {
            if (process.platform === 'win32') {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-windows-x86_64.zip`;
            } else if (process.platform === 'darwin') {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-darwin-x86_64.tar.gz`;
            } else {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-linux-x86_64.tar.gz`;
            }
        }
    }
}
