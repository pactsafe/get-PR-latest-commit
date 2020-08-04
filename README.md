# get-PR-latest-commit v1
The GitHub Action to get the latest commit on pull request. This Action (written in JavaScript) wraps the "[List commits on a pull request](https://docs.github.com/en/rest/reference/pulls#list-commits-on-a-pull-request)" API, and extracts the infomation of the latest commit from the response of the API.<BR/>
Through this action, you can get the following information:
* The commit message of the latest commit.
* The commit SHA of the latest commit.
* The path of a JSON file generated to store the context of the latest commit.

## Inputs
|Name         |Required |Description                                                                                                 |Default                                  |
|-------------|:-------:|------------------------------------------------------------------------------------------------------------|-----------------------------------------|
|`repository` |YES      |The name of the repository which the pull request is in. <BR/>For example, 'ActionsRML/latest-commit-on-PR' |`${{ github.repository }}`               |
|`pull_number`|YES      |The number of the pull request.                                                                             |`${{ github.event.pull_request.number }}`|
|`token`      |-        |Personal access token (PAT) used to authenticate.                                                           |`${{ github.token }}`                    |

## Outputs
|Name                  |description                                                                   |
|----------------------|------------------------------------------------------------------------------|
|`latest_commit_sha`     |The commit SHA of the latest commit.                                          |
|`latest_commit_message` |The commit message of the latest commit.                                      |
|`latest_commit_context` |The path of a JSON file generated to store the context of the latest commit.  |

## License
The scripts and documentation in this project are released under the [MIT License](https://github.com/ActionsRML/get-PR-latest-commit/blob/master/LICENSE) .
