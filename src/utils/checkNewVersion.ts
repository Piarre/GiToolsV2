import chalk from "chalk";
import { intro, outro, spinner } from "@clack/prompts";
import { gitools } from "../index.js";

export default async function chechForNewVersion() {
  // Get version tag from npmjs.com
  await fetch("https://registry.npmjs.com/@piarre/gitools/")
    .then((res) => res.json())
    .then((res) => {
      const newVer = res["dist-tags"].latest;
      if (newVer != !gitools.version()) {
        intro(chalk.green(`A new version is available: ${newVer}`));
        outro(chalk.green(`Update by running: npm i -g gitools@${newVer}`));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
