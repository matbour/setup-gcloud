"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const exec = __importStar(require("@actions/exec"));
class Downloader {
    constructor(version) {
        this.version = version;
        this.BASE_URL = 'https://dl.google.com/dl/cloudsdk/channels/rapid';
        this.sdkUrl = this.BASE_URL;
        this.compressMode = 'tar.gz';
        this.setSdkDownloadUrl();
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            return exec.exec(`curl -o google-cloud-sdk.${this.compressMode} '${this.sdkUrl}'`);
        });
    }
    setSdkDownloadUrl() {
        if (this.version === 'latest') {
            if (process.platform === 'win32') {
                this.sdkUrl = `${this.BASE_URL}/google-cloud-sdk.zip`;
                this.compressMode = 'zip';
            }
            else {
                this.sdkUrl = `${this.BASE_URL}/google-cloud-sdk.tar.gz`;
                this.compressMode = 'tar.gz';
            }
        }
        else {
            if (process.platform === 'win32') {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-windows-x86_64.zip`;
                this.compressMode = 'zip';
            }
            else if (process.platform === 'darwin') {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-darwin-x86_64.tar.gz`;
                this.compressMode = 'tar.gz';
            }
            else {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-linux-x86_64.tar.gz`;
                this.compressMode = 'tar.gz';
            }
        }
    }
}
exports.Downloader = Downloader;
