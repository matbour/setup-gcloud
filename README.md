# @mathrix-education/setup-gcloud
Small GitHub action to install the Google Cloud SDK on the virtual
environment.

Proudly maintained by [Mathieu Bour][1.1], Vice-CTO
[@mathrix-education][1.2].

[1.1]: https://github.com/mathieu-bour
[1.2]: https://github.com/mathrix-education

## Motivations
Since the advent of GitHub Actions, Mathrix Education SA has chosen to
migrate from Google Cloud Build to this new compilation system.

If the official [@actions/gcloud][2.1] action works perfectly, the fact
that it is in two parts ([auth][2.2] and [cli][2.3]) and that it is
based on Docker makes it slow and not very suitable for launching
multiple commands.

So we chose to create a JavaScript action to fix this problem, also
adding additional features, such as Docker authentication with Google
Cloud Container Registry.

[2.1]: https://github.com/actions/gcloud
[2.2]: https://github.com/actions/gcloud/tree/master/auth
[2.3]: https://github.com/actions/gcloud/tree/master/cli


## Usage
### Supported operating systems
This action currently supports only Mac-OS and Ubuntu based systems.
Indeed, despite our efforts, we have not been able to launch the
installation of the Google Cloud SDK on Windows.

The supported operating systems matrix is the following:

| Operating system | Status |
|------------------|-------|
| `ubuntu-latest`  | ![3.1] |
| `macos-latest`   | ![3.1] |
| `windows-latest` | ![3.2] |

[3.1]: https://img.shields.io/badge/status-supported-brightgreen
[3.2]: https://img.shields.io/badge/status-unsupported-red


## In workflows
See [action.yml](action.yml) for details.
Simply add this step in your workflow `steps`.

```yaml
- uses: mathrix-education/setup-gcloud@master
  with:
    version: 245.0.0.0      # default: latest
    service-account-key:    # base64 encoded JSON service account key
    components: beta        # additional components to install
    configure-docker: true  # configure docker during install
```
