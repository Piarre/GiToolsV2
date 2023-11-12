import chalk from "chalk";
import { intro, outro, spinner } from "@clack/prompts";
import { gitools } from "../index.js";

export default async function chechForNewVersion() {
  const remoteVersion = await fetch("https://api.github.com/repos/Piarre/GiToolsV2/releases/latest")
    .then((res) => res.json())
    .then((data) => data.tag_name);

  if (remoteVersion !== gitools.version()) {
    intro(chalk.green(`A new version is available: ${remoteVersion}`));
    outro(chalk.green(`Update by running: npm i -g gitools@${gitools.version()}`));
    process.exit(0);
  }
}
