const core = require("@actions/core");
const { Octokit } = require("@octokit/core");

async function run() {
    try {
      const pr_number = core.getInput('pull-number');
      const token = core.getInput('token');
      const octokit = new Octokit({ auth: `${token}` });
      
      const repository = core.getInput('repository');
      const splitRepository = repository.split('/');
      if (splitRepository.length !== 2 ||
          !splitRepository[0] ||
          !splitRepository[1]) {
          throw new Error(`Invalid repository '${repository}'. Expected format {owner}/{repo}.`);
      }
      const owner = splitRepository[0];
      const repo = splitRepository[1];
      
      const response = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/commits', {
        owner: '${owner}',
        repo: '${repo}',
        pull_number: '${pr_number}'
      });
      console.log(`${response}`);
    }
    catch (error) {
      core.setFailed(error.message);
    }
  }
  run();
