# Changelog

## [Version 1.3.1](https://github.com/mathrix-education/setup-gcloud/releases/tag/1.3.1)
- **ci**(actions): drop ubuntu-16.04 tests since it is deprecated
- **chore**(deps): upgrade dependencies (fixes CVE-2021-23337)

## [Version 1.3.0](https://github.com/mathrix-education/setup-gcloud/releases/tag/1.3.0)
- **feat**(docker): artifact registries may now be specified independently
- **ci**(sonarcloud): implement SonarCloud static analysis
- **chore**(rebrand): the repository is now maintained by [mathieu-bour](https://github.com/mathieu-bour)
- **chore**(deps): upgrade dependencies

## [Version 1.2.2](https://github.com/mathrix-education/setup-gcloud/releases/tag/1.2.2)
- **security**(deps): bump [@actions/core](https://github.com/actions/toolkit/tree/main/packages/core) from 1.2.4 to 1.2.6 (fixes [GHSA-mfwh-5m23-j46w](https://github.com/actions/toolkit/security/advisories/GHSA-mfwh-5m23-j46w))
- **fix**(ci): set setup-node version to @v1

## [Version 1.2.1](https://github.com/mathrix-education/setup-gcloud/releases/tag/1.2.1)
- **chore**(deps): bumps lodash from 4.17.15 to 4.17.19 (fixes GHSA-p6mc-m468-83gw)
- **chore**(repo): rename `master` branch to `main`

## [Version 1.2.0 - Local SDK](https://github.com/mathrix-education/setup-gcloud/releases/tag/1.2.0)
- **feat**: add `local` for `version` input which will use the locally provided Google Cloud SDK if available
- **chore**(deps): upgrade dependencies
- **chore**: update license

## [Version 1.1.2](https://github.com/mathrix-education/setup-gcloud/releases/tag/1.1.2)
- **chore**(security): upgrade @actions/http-client dependency (GHSA-9w6v-m7wp-jwg4)

## [Version 1.1.1](https://github.com/mathrix-education/setup-gcloud/releases/tag/1.1.1)
- **ci**(lint): add eslint / prettier and action job
- **docs**(readme): break lines on new sentences
- **chore**(workspace): add standard commit, update pre-commit hook
- **chore**(security): upgrade minimist dependency (GHSA-7fhm-mqm4-2wp7)

## [Version 1.1.0](https://github.com/mathrix-education/setup-gcloud/releases/tag/1.1.0)
- **chore**(deps): bump TypeScript to version 3.8 (closes #9)
- **fix**: project configuration without service account key (closes #8)

## [Version 1.0.0 - Stable release](https://github.com/mathrix-education/setup-gcloud/releases/tag/1.0.0)
- **feat**: added support for Windows
- **fixed**: inputs are now compared to strings
- **fixed**: project guess using the `service-account-key` input
- **changed**: new install directories
    - `/usr/lib/google-cloud-sdk` on Ubuntu runners (overrides the already installed one)
    - `$HOME/opt/google-cloud-sdk` on MacOS runners
    - `C:\Program Files\google-cloud-sdk` on Windows runners

## [Version 0.1.3 - Automatic project discovery](https://github.com/mathrix-education/setup-gcloud/releases/tag/0.1.3)
- **feat**: make `project` input optional - it is discovered with the service account key
- **feat**: compile using ES6 library
- **docs**: add examples in the README.md, better input descriptions
- **chore**: add license and other legal stuff

## [Version 0.1.2](https://github.com/mathrix-education/setup-gcloud/releases/tag/0.1.2)
- **feat**: add `project` input support
- **feat**: make service-account-key input optional - authentication is executed later
- **chore**: rename repository from mathrix-education/actions-gcloud to mathrix-education/setup-gcloud

## [Version 0.1.1](https://github.com/mathrix-education/setup-gcloud/releases/tag/0.1.1)
- **fixed**: set `version` input default value to 'latest' in `action.yml.

## [Version 0.1.0 - First release](https://github.com/mathrix-education/setup-gcloud/releases/tag/0.1.0)