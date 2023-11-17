import { Command } from "commander";
import Git from "./utils/git.js";
import chechForNewVersion from "./utils/checkNewVersion.js";

export const gitools = new Command();
gitools.version("1.0.2");

gitools
  .command("init")
  .alias("i")
  .action(async () => await Git.init())
  .description("Initialize a new Git repository");

gitools
  .command("add")
  .option<boolean>("-a, --all", "Add all files", () => false)
  .action((option) => Git.add(option ? true : false))
  // .action(() => Git.add())
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
