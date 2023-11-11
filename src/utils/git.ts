import { execa } from "execa";
import chalk from "chalk";
import { existsSync } from "fs";
import { confirm, intro, multiselect, outro, spinner, text } from "@clack/prompts";

export namespace Git {
  export async function init() {
    await execa("git", ["init"]);
  }

  export async function checkForRepository() {
    const repoExists = await existsSync(".git");
    if (!repoExists) {
      const repoSpinner = spinner();
      intro(chalk.red("This folder is not a git repository!"));
      const test = await confirm({
        message: "Create new repository?",
        initialValue: true,
      });
      if (test.valueOf()) {
        repoSpinner.start("Creating...");
        await init();
        repoSpinner.stop("Done");
        outro(chalk.green("New repository created"));
      } else {
        outro(chalk.red("Exited"));
        process.exit(0);
      }
    }
    return;
  }

  export async function getFilesToAdd() {
    const { stdout } = await execa("git", ["status", "-s"]);
    const files = stdout.split("\n").map((line) => line.slice(3));

    const filesToAdd = (await multiselect({
      message: "Select additional tools.",
      options: files.map((file) => {
        return { value: file, label: file };
      }),
      required: false,
    })) as string[];

    // execa("git", ["add", filesToAdd.join(" ")]);
  }

  export async function commit() {
    intro("git commit");
    const commitMsg = (await text({
      message: "Commit message",
      placeholder: "Enter commit message",
    })) as string;

    const descNeeded = await confirm({
      message: "Do you want to add a description?",
    });

    if (descNeeded) {
      const desc = (await text({
        message: "Description",
        placeholder: "Enter description",
      })) as string;
      console.log(desc);
    }

    outro(`Commited with message: ${commitMsg}`);
    console.log(commitMsg);
  }
}
