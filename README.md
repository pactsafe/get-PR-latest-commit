# get-PR-latest-commit v1
An action to get the latest commit on pull request. <BR/>
Through this action, you can get the following information:
* The commit message of the latest commit.
* The commit SHA of the latest commit.
* The path of the JSON file to store the context of the commit.

## Inputs
|Name   |Required   |description   |default   |
|--------------|:----:|------------------------------------------------------------------------------------------------------------|:-----------------------------------------|
|repository    |YES   |The name of the repository which the pull request is in. <BR/>For example, 'ActionsRML/latest-commit-on-PR' |${{ github.repository }}                  |
|pull_number   |YES   |The number of the pull request.                                                                             |${{ github.event.pull_request.number }}   |
|token         |-     |Personal access token (PAT) used to authenticate.                                                           |${{ github.token }}                       |
