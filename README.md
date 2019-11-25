# @mathrix-education/setup-gcloud
Install the Google Cloud SDK in your GitHub Actions workflow.

**This action is not supported by Google Cloud.**

Proudly maintained by [Mathieu Bour][1.1], Vice-CTO [@mathrix-education][1.2].

[1.1]: https://github.com/mathieu-bour
[1.2]: https://github.com/mathrix-education

## Motivations
Since the advent of GitHub Actions, Mathrix Education SA has chosen to migrate from Google Cloud Build to this new
compilation system.

If the official [@actions/gcloud][2.1] action works perfectly, the fact that it is in two parts ([auth][2.2] and
[cli][2.3]) and that it is based on Docker makes it slow and not very suitable for launching multiple commands.

So we chose to create a JavaScript action to fix this problem, also adding additional features, such as Docker
authentication with Google Cloud Container Registry.

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

### Inputs
| Name                  | Type                           | Default value |
|-----------------------|--------------------------------|---------------|
| `version`             | `'latest'` / `string`          | `'latest'`    |
| `service-account-key` | `string` (base64)              | `''`          |
| `project`             | `'auto'` / `'none'` / `string` | `'auto'`      |
| `components`          | `string`                       | `''`          |
| `configure-docker`    | `true` / `false`               | `false`       |

#### `version`
If you need a precise version of the Google Cloud SDK, you may provide this input. We strongly advise you to do so
since using the latest version may break your workflow if Google release a breaking version.

#### `service-account-key`
To authenticate the SDK, you may provide a **base64-encoded** service account JSON key. In order to secure you workflow,
use GitHub Actions [secrets][3.3].

[3.3]: https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets

#### `project`
By default, if you provide a `service-account-key`, the action will use it to determine which is the default project.

- If you want to specify a different project (for example, in case of cross-project interaction), you may explicitly
specify your project ID here.
- If you want to disable the project configuration and provide your project ID later in your workflow, set this input
to `none`.

#### `components`
If you want to install additional SDK components, you may provide them in this input.

#### `configure-docker`
If you want to push an image to the Google Container Registry, you may authenticate the Docker agent by setting the
input to true. 


## Examples
See [action.yml](action.yml) for details.

### Minimum configuration
```yaml
- uses: mathrix-education/setup-gcloud@master
```
By default, the minimal example will install the latest Google Cloud SDK. Because no service account key was provided
you will have to authenticate the SDK yourself (for example, with [`gcloud auth activate-service-account`][4.1]).

[4.1]: https://cloud.google.com/sdk/gcloud/reference/auth/activate-service-account


### Typical CI configuration
```yaml
- name: Setup Google Cloud SDK
  uses: mathrix-education/setup-gcloud@0.1.3
  with:
    service-account-key: ${{ secrets.GCLOUD_AUTH }} # base64-encoded service account JSON key
    confgure-docker: true
```
In this example, you provide a service account key. The action automatically download the latest version of the SDK and
authenticate using your key.

Then using the field `"project_id"` of your key, we will set the default project using
`gcloud config set project {project}`, so you do not have to do it later.

Finally, because you may want to build a Docker image and upload it to the [Google Container Registry][4.2], the action
will configure Docker to allow the upload of your image. Make sure that the service account has the correct rights to
write on the bucket linked to the registry.

[4.2]: https://cloud.google.com/container-registry/
