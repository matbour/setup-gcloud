import * as core from '@actions/core';
import {download} from './download';
import {setup} from './setup';
import {authenticate} from './authenticate';
import {isWindows} from './utils';

export async function install() {
    try {
        if (isWindows()) {
            core.error('This action does not support Windows for now. PR are welcome!');
        }

        await download();
        await setup();
        await authenticate();
    } catch (e) {
        core.error(e.message);
        process.exit(1);
    }
}

install().then();
