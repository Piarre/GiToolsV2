import chalk from "chalk";
import { intro, outro, spinner } from "@clack/prompts";
import { gitools } from "../index.js";

export default async function chechForNewVersion() {
  // Get version tag from npmjs.com
  const remoteVersion = await fetch("https://registry.npmjs.com/@piarre/gitools/")
    .then((res) => res.json())
    .then((res) => res["dist-tags"].latest);

  if (remoteVersion != !gitools.version()) {
    intro(chalk.green(`A new version is available: ${remoteVersion}`));
    outro(chalk.green(`Update by running: npm i -g gitools@${remoteVersion}`));
  }
}

