async function run() {
    try {
      // Fetch all the inputs
      const core = require("@actions/core");
      const repository = core.getInput('repository');
      const pr_number = core.getInput('pull_number');
      const token = core.getInput('token');
      
      // Split the input 'repository' (format {owner}/{repo}) to be {owner} and {repo}
      const splitRepository = repository.split('/');
      if (splitRepository.length !== 2 ||
          !splitRepository[0] ||
          !splitRepository[1]) {
          throw new Error(`Invalid repository '${repository}'. Expected format {owner}/{repo}.`);
      }
      const repo_owner = splitRepository[0];
      const repo_name = splitRepository[1];     
      
      // Execute the API "List commits on a pull request", see 'https://octokit.github.io/rest.js/v18#pulls-list-commits'
      const { Octokit } = require("@octokit/rest");
      const octokit = new Octokit({ auth: token });
      const response = await octokit.pulls.listCommits({
        owner: repo_owner,
        repo: repo_name,
        pull_number: pr_number
      });
      
      // Get the index of the latest comment in the array
      const index = response.data.length - 1;
      
      console.log(`➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ The context of latest commit ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`);
      console.log(response.data[index]);
      console.log(`➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`);
      
      console.log(`>`);
      console.log(`>`);    
      
      // Generate the path to save the json file
      const path = require('path');
      const outputPath = path.join(process.env.RUNNER_WORKSPACE, 'pull', pr_number);
      const io = require('@actions/io');
      await io.mkdirP(outputPath);
      const path_json_file = path.join(outputPath, 'latest_commit.json');
      
      // Write the json object of the latest commit into the json file
      const fs = require('fs');
      fs.writeFile(path_json_file, JSON.stringify(response.data[index], null, 4), (err) => {
          // In case of a error throw err. 
          if (err) throw err;
      });
      
      console.log(`Set outputs:🔧✍`);
      core.setOutput('latest_commit_context', path_json_file);
      core.setOutput('latest_commit_sha', response.data[index].sha);
      core.setOutput('latest_commit_message', response.data[index].commit.message);
    }
    catch (error) {
      core.setFailed(error.message);
    }
  }
  run();
