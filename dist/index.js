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
      
      console.log(`============================================= START - The latest commit context =============================================`);
      console.log(response.data[index]);
      console.log(`============================================== END - The latest commit context ==============================================`);
      
      const os = require('os');
      const homedir = os.homedir();
//       console.log(`homedir = ${homedir}`);
      
      console.log(`RUNNER_WORKSPACE = `, process.env.RUNNER_WORKSPACE);
      
      const path = require('path');
      const outputPath = path.join(homedir, 'get-PR-latest-commit/pull', pr_number);
//       console.log(`outputPath = ${outputPath}`);
      
      const io = require('@actions/io');
      await io.mkdirP(outputPath);
      
      const context_json_path = path.join(outputPath, 'latest_commit.json');
      const fs = require('fs');
      fs.writeFile(context_json_path, response.data[index], (err) => {
          // In case of a error throw err. 
          if (err) throw err;
      });
      
      console.log(`>`);
      console.log(`>`);
      
      console.log(`==================================================== START - Set outputs ====================================================`);
      core.setOutput('latest_commit_context', context_json_path);
      core.setOutput('latest_commit_sha', response.data[index].sha);
      core.setOutput('latest_commit_message', response.data[index].commit.message);
      console.log(`===================================================== END - Set outputs =====================================================`);
    }
    catch (error) {
      core.setFailed(error.message);
    }
  }
  run();
