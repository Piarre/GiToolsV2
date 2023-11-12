import { Command } from "commander";
import Git from "./utils/git.js";
import chechForNewVersion from "./utils/checkNewVersion.js";

export const gitools = new Command();
gitools.version("1.0.2");

gitools
  .command("add")
  // .option("-a, --all <boolean>", "Add all files", false)
  // .action((_, option) => Git.add(option ? true : false))
  .action(() => Git.add())
  // .action((option) => console.log(option.all))
  .description("Add files to git");
gitools
  .command("commit")
  .action(() => Git.commit())
  .description("Commit to remote repository");

gitools
  .command("push")
  .action(() => Git.push())
  .description("Push to remote repository");

(async () => {
  await chechForNewVersion();
  console.clear();
  gitools.parse(process.argv);
})();
