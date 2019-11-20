import {download} from './download';
import {setup} from './setup';
import {authenticate} from './authenticate';

export async function install() {
    await download();
    await setup();
    await authenticate();
}

install().then();
