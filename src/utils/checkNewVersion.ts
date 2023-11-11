import chalk from "chalk";
import { intro, outro, spinner } from "@clack/prompts";
import { CONFIG } from "../config.js";

export default async function chechForNewVersion() {
  const remoteVersion = await fetch(
    "https://api.github.com/repos/Piarre/GiTools/releases/latest"
  )
    .then((res) => res.json())
    .then((data) => data.tag_name);

  if (remoteVersion !== CONFIG.VERSION) {
    intro(chalk.green(`A new version is available: ${remoteVersion}`));
    outro(chalk.green(`Update by running: npm i -g gitools@${CONFIG.VERSION}`));
    process.exit(0);
  }
}

chechForNewVersion();
