import { resolve } from 'path';

export const INSTALL_DIRECTORY = 'google-cloud-sdk';
export const UBUNTU_INSTALL_PATH = `/usr/lib/${INSTALL_DIRECTORY}`;
export const MACOS_INSTALL_PATH = resolve(process.env.HOME ?? process.cwd(), INSTALL_DIRECTORY);
export const WINDOWS_INSTALL_PATH = `C:\\Program Files\\${INSTALL_DIRECTORY}`;
