import { Command, createCommand } from "commander";
import Git from "./utils/git.js";

const program = new Command();
program.version("1.0.0");

program.command("add").action(() => Git.getFilesToAdd());
program.command("commit").action(() => Git.commit());

program.parse(process.argv);
