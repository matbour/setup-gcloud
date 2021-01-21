# mathieu-bour/setup-gcloud

![Workflow status][workflow]
![Latest release][latest-release]

Install the Google Cloud SDK in your GitHub Actions workflow.

**This action is not supported by Google Cloud.**

Proudly maintained by [Mathieu Bour][@mathieu-bour], former Vice-CTO [@mathrix-education][@mathrix-education].

## Announcements
2020/11/20: The [GoogleCloudPlatform official GitHub organization][@GoogleCloudPlatform] has deprecated the
[setup-gcloud][@GoogleCloudPlatform/github-actions/setup-gcloud] action.
[@google-github-actions/setup-gcloud][@google-github-actions/setup-gcloud] should be used instead for comparison.

2019/01/27: The [GoogleCloudPlatform official GitHub organization][@GoogleCloudPlatform] has released an official
[setup-gcloud][@GoogleCloudPlatform/github-actions/setup-gcloud] action.
Compared to Edutech's one, we provide some additional automation tasks, such as project id discovery and automatic
Docker Configuration.

## Acknowledgements
This action was initially developed for [Education Media SA][@mathrix-education].
The repository is now maintained by [@mathieu-bour][@mathieu-bour].

## Motivations
Since the advent of GitHub Actions, Edutech Media SA has chosen to migrate from Google Cloud Build to this new
compilation system.

If the official [@actions/gcloud][@actions/gcloud] action works perfectly, the fact that it is in two parts
([auth][@actions/gcloud/auth] and [cli][@actions/gcloud/cli]) and that it is based on Docker makes it slow and not
very suitable for launching multiple commands.

So we chose to create a JavaScript action to fix this problem, also adding additional features, such as Docker
authentication with Google Cloud Container Registry.

## Usage
### Supported operating systems
This action currently supports Ubuntu, Mac-OS and Windows based systems.
The supported operating system matrix is the following:

| Operating system                  | Status       |
|-----------------------------------|--------------|
| `ubuntu-16.04`                    | ![supported] |
| `ubuntu-18.04` (`ubuntu-latest`)  | ![supported] |
| `ubuntu-20.04`                    | ![supported] |
| `macos-10.15` (`macos-latest`)    | ![supported] |
| `windows-2019` (`windows-latest`) | ![supported] |


### Inputs
| Name                  | Type                            | Default value |
|-----------------------|---------------------------------|---------------|
| `version`             | `'latest'` / `local` / `string` | `'latest'`    |
| `service-account-key` | `string` (base64)               | `''`          |
| `project`             | `'auto'` / `'none'` / `string`  | `'auto'`      |
| `components`          | `string`                        | `''`          |
| `configure-docker`    | `'true'` / `'false'` / `string` | `'false'`     |

#### `version`
If you need a precise version of the Google Cloud SDK, you may provide this input.
By default, the latest version of the Google Cloud SDK will be downloaded.
We strongly advise you to do so since using the latest version may break your workflow if Google release a breaking
version.
If you prefer using the pre-installed Google Cloud SDK (**ubuntu only**), you may use `local`.

#### `service-account-key`
To authenticate the SDK, you may provide a **base64-encoded** service account JSON key.
In order to secure you workflow, use GitHub Actions [secrets][actions-secrets].

#### `project`
By default, if you provide a `service-account-key`, the action will use it to determine which is the default project.

- If you want to specify a different project (for example, in case of cross-project interaction), you may explicitly
specify your project ID here.
- If you want to disable the project configuration and provide your project ID later in your workflow, set this input
to `'none'`.

#### `components`
If you want to install additional SDK components (for example: `beta` or `gsutil`), you may provide them in this input
as a comma-separated list.

#### `configure-docker`
If you want to push an image to the Google Container Registry, you may authenticate the Docker agent.
Use `'true'` to authenticate against all the `*.gcr.io` registries, or comma-separated Artifacts Registries.


## Examples
See [action.yml](action.yml) for details.

### Minimum configuration
```yaml
- uses: mathieu-bour/setup-gcloud@main  # WARNING: se the latest stable version instead!
```
By default, the minimal example will install the latest Google Cloud SDK.
Because no service account key was provided you will have to authenticate the SDK yourself (for example, with
[`gcloud auth activate-service-account`][activate-service-account]).

### Typical CI configuration
```yaml
- name: Setup Google Cloud SDK
  uses: mathieu-bour/setup-gcloud@1.3.0
  with:
    service-account-key: ${{ secrets.GCLOUD_AUTH }} # base64-encoded service account JSON key
    confgure-docker: true
```
In this example, you provide a service account key.
The action automatically download the latest version of the SDK and authenticates using your key.

Then using the field `"project_id"` of your key, we will set the default project using
`gcloud config set project {project}`, so you do not have to do it later.

Finally, because you may want to build a Docker image and upload it to the
[Google Container Registry][container-registry], the action will configure Docker to allow the upload of your image.
Make sure the service account has the correct rights to write on the bucket linked to the registry.

[@mathieu-bour]: https://github.com/mathieu-bour
[@mathrix-education]: https://github.com/mathrix-education
[@GoogleCloudPlatform]: https://github.com/GoogleCloudPlatform
[@actions/gcloud]: https://github.com/actions/gcloud
[@actions/gcloud/auth]: https://github.com/actions/gcloud/tree/master/auth
[@actions/gcloud/cli]: https://github.com/actions/gcloud/tree/master/cli
[@GoogleCloudPlatform/github-actions/setup-gcloud]: https://github.com/GoogleCloudPlatform/github-actions/tree/master/setup-gcloud
[@google-github-actions/setup-gcloud]: https://github.com/google-github-actions/setup-gcloud

[actions-secrets]: https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets

[activate-service-account]: https://cloud.google.com/sdk/gcloud/reference/auth/activate-service-account
[artifact-registry]: https://cloud.google.com/artifact-registry
[container-registry]: https://cloud.google.com/container-registry

[workflow]: https://img.shields.io/github/workflow/status/mathieu-bour/setup-gcloud/Tests?style=flat-square
[latest-release]: https://img.shields.io/github/v/release/mathieu-bour/setup-gcloud?label=latest%20release&style=flat-square
[supported]: https://img.shields.io/badge/status-supported-brightgreen

