# Changelog

## Version 1.0.0 - Stable release
- **feat**: added support for Windows
- **fixed**: inputs are now compared to strings
- **fixed**: project guess using the `service-account-key` input
- **changed**: new install directories
    - `/usr/lib/google-cloud-sdk` on Ubuntu runners (overrides the already installed one)
    - `$HOME/opt/google-cloud-sdk` on MacOS runners
    - `C:\Program Files\google-cloud-sdk` on Windows runners

## Version 0.1.x - Pre-releases
The versions are now deprecated and should not be used.
