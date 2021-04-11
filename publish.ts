import { Octokit } from "@octokit/core";
import dotenv from "dotenv";
import fsAsync from "fs/promises";
import { exec as execCallback } from "child_process";
import axios from "axios";

function exec(command: string) {
  return new Promise<void>((resolve) => {
    execCallback(command, () => {
      resolve();
    });
  });
}

dotenv.config();
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

(async () => {
  const deviconVersion = (
    await octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
      owner: "devicons",
      repo: "devicon",
    })
  ).data.tag_name.replace("v", "");
  const currentVersion = (
    await octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
      owner: "maltejur",
      repo: "react-devicons",
    })
  ).data.tag_name.replace("v", "");

  if (deviconVersion != currentVersion) {
    console.log(
      `New version available (${currentVersion} -> ${deviconVersion})`
    );
    console.log(" - Building");
    await exec("yarn build");
    // console.log(" - Publishing");
    // await fsAsync.writeFile(
    //   "dist/.npmrc",
    //   `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}`
    // );
    // await exec(
    //   `yarn --cwd dist publish --non-interactive --new-version ${deviconVersion}`
    // );
    console.log(" - Creating github release");
    const release_id = (
      await octokit.request("POST /repos/{owner}/{repo}/releases", {
        owner: "maltejur",
        repo: "react-devicons",
        tag_name: `v${deviconVersion}`,
      })
    ).data.id;
    await exec("zip react-devicons.zip dist -r");
    await axios({
      url: `https://uploads.github.com/repos/maltejur/react-devicons/releases/${release_id}/assets?name=react-devicons.zip`,
      data: Buffer.from(await fsAsync.readFile("./react-devicons.zip")),
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/zip",
      },
    });
    console.log("All done!");
  } else {
    console.log(`Version up to date (${deviconVersion})`);
  }
})();
