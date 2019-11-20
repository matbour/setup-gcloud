import * as core from '@actions/core';
import {download} from './download';
import {setup} from './setup';
import {authenticate} from './authenticate';

export async function install() {
    try {
        await download();
        await setup();
        await authenticate();
    } catch (e) {
        core.error(e.message);
        process.exit(1);
    }
}

install().then();
