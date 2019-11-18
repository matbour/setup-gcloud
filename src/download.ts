import Axios from 'axios';
import {promises} from 'fs';
import * as core from '@actions/core';

export class Download {
    private readonly BASE_URL: string = 'https://dl.google.com/dl/cloudsdk/channels/rapid';
    private sdkUrl: string = this.BASE_URL;
    public compressMode: 'zip' | 'tar.gz' = 'tar.gz';

    constructor(private version: string) {
        this.setSdkDownloadUrl();
    }

    async download(): Promise<string> {
        const destination = `google-cloud-sdk.${this.compressMode}`;

        core.debug(`Downloading ${this.sdkUrl}`);
        const response = await Axios.get(this.sdkUrl, {
            onDownloadProgress: (e) =>console.log(e)
        });
        await promises.writeFile(destination, response.data);
        core.debug(`Downloaded ${this.sdkUrl}`);

        return destination;
    }

    setSdkDownloadUrl(): void {
        if (this.version === 'latest') {
            if (process.platform === 'win32') {
                this.sdkUrl = `${this.BASE_URL}/google-cloud-sdk.zip`;
                this.compressMode = 'zip';
            } else {
                this.sdkUrl = `${this.BASE_URL}/google-cloud-sdk.tar.gz`;
                this.compressMode = 'tar.gz';
            }
        } else {
            if (process.platform === 'win32') {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-windows-x86_64.zip`;
                this.compressMode = 'zip';
            } else if (process.platform === 'darwin') {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-darwin-x86_64.tar.gz`;
                this.compressMode = 'tar.gz';
            } else {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-linux-x86_64.tar.gz`;
                this.compressMode = 'tar.gz';
            }
        }
    }
}
