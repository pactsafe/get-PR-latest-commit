# get-PR-latest-commit v2
The GitHub Action to get the latest commit on pull request. This Action (written in JavaScript) wraps the "[**List commits on a pull request**](https://docs.github.com/en/rest/reference/pulls#list-commits-on-a-pull-request)" API, and extracts the infomation of the latest commit from the response of the API.<BR/>
Through this action, you can get the following information:
* The commit message of the latest commit.
* The commit SHA of the latest commit.
* The path of a JSON file generated to store the context of the latest commit.

## What's new? (Fix [#5](https://github.com/ActionsRML/get-PR-latest-commit/issues/5))
On **`v1`** of this action, we did not consider that a PR could contain too much commits. So I ignored the inputs parameters "**`per_page`**" and "**`page`**". It can only return the first page that contains up to 30 items. This causes the issue that if the PR contains more than 30 commits, the action can't return the actual latest commit on the PR. The return commit is the last one on the first page. So, the **`v1`** only can work correctly if the total count of the PR commits is less than or equal to 30.
<br />
<br />
On **`v2`** of this action, we fixed this defect. The action can traverse all the pages until the last commit on the last page is found.
> **Note:** This action still follows the limitation of the "**List commits on a pull request**" API that it can only list a maximum of 250 commits for a pull request. If the number of the PR commits is more than 250, the action will not correctly return the actual latest commit. At this time, you need to use the "[**List commits**](https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#list-commits)" API.
##

## Inputs
|Name         |Required |Description                                                                                                 |Default                                  |
|-------------|:-------:|------------------------------------------------------------------------------------------------------------|-----------------------------------------|
|`repository` |YES      |The name of the repository which the pull request is in. <BR/>E.g. '**ActionsRML/latest-commit-on-PR**'     |`${{ github.repository }}`               |
|`pull_number`|YES      |The number of the pull request.                                                                             |`${{ github.event.pull_request.number }}`|
|`token`      |-        |Personal access token (PAT) used to authenticate.                                                           |`${{ github.token }}`                    |

## Outputs
|Name                  |description                                                                   |
|----------------------|------------------------------------------------------------------------------|
|`latest_commit_sha`     |The commit SHA of the latest commit.                                          |
|`latest_commit_message` |The commit message of the latest commit.                                      |
|`latest_commit_context` |The path of a JSON file generated to store the context of the latest commit.  |

## Example workflow
```yaml
on: pull_request

jobs:
  job1:
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    steps:      
      - name: Get the latest commit on PR
        id: get-latest-commit
        uses: ActionsRML/get-PR-latest-commit@v1

      - name: print the info of the latest commit
        run: |
          echo "The commit message:"
          echo "${{ steps.get-latest-commit.outputs.latest_commit_message }}"
          
          echo "The commit sha:"
          echo "${{ steps.get-latest-commit.outputs.latest_commit_sha }}"
          
          echo "The commit context:"
          cat ${{ steps.get-latest-commit.outputs.latest_commit_context }}
```

## License
The scripts and documentation in this project are released under the [MIT License](https://github.com/ActionsRML/get-PR-latest-commit/blob/master/LICENSE) .
