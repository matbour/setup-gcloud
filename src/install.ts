import {Download} from './download';


export async function install() {
    const downloader = new Download('latest');
    await downloader.download();
}

install();
