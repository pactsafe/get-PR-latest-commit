const core = require("@actions/core");
const { Octokit } = require("@octokit/rest");
const exec = require("@actions/exec");

async function run() {
    try {
      const token = core.getInput('token');
      const octokit = new Octokit({ auth: token });
      
      const repository = core.getInput('repository');
      const splitRepository = repository.split('/');
      if (splitRepository.length !== 2 ||
          !splitRepository[0] ||
          !splitRepository[1]) {
          throw new Error(`Invalid repository '${repository}'. Expected format {owner}/{repo}.`);
      }
      const repo_owner = splitRepository[0];
      const repo_name = splitRepository[1];
      const pr_number = core.getInput('pull_number');
           
      const response = await octokit.pulls.listCommits({
        owner: repo_owner,
        repo: repo_name,
        pull_number: pr_number
      });
           
      const index = response.data.length - 1;          
      core.setOutput('latest_commit_context', response.data[index]);
      core.setOutput('latest_commit_message', response.data[index].commit.message);
      core.setOutput('latest_commit_sha', response.data[index].sha);
    }
    catch (error) {
      core.setFailed(error.message);
    }
  }
  run();