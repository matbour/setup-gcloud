import * as exec from '@actions/exec';

export class Download {
    private readonly BASE_URL: string = 'https://dl.google.com/dl/cloudsdk/channels/rapid';
    private sdkUrl: string = this.BASE_URL;
    public compressMode: 'zip' | 'tar.gz' = 'tar.gz';

    constructor(private version: string) {
        this.setSdkDownloadUrl();
    }

    async download() {
        return exec.exec(`curl -o google-cloud-sdk.${this.compressMode} '${this.sdkUrl}'`);
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
