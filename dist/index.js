const core = require("@actions/core");
const { Octokit } = require("@octokit/core");

async function run() {
    try {
      const repository = core.getInput('repository');
      const pr_number = core.getInput('pull-number');
      const token = core.getInput('token');

      const octokit = new Octokit({ auth: `${token}` });
      const response = await octokit.request('GET /repos/{repository}/pulls/{pull_number}/commits', {
        repository: '${repository}',
        pull_number: pr_number
      });
      console.log(`${response}`);
    }
    catch (error) {
      core.setFailed(error.message);
    }
  }
  run();