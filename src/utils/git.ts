import { execa } from "execa";
import chalk from "chalk";
import { existsSync } from "fs";
import { cancel, confirm, intro, multiselect, outro, spinner, text } from "@clack/prompts";

export namespace Git {
  export async function init() {
    intro("New Git repository");
    const remoteUrl = (await text({
      message: "Remote url",
      placeholder: "https://github.com/USERNAME/REPO",
    })) as string;

    const changedBranchName = await confirm({
      message: "By default, the branch is named main, do you want to change it?",
    });

    if (changedBranchName) {
      const branchName = (await text({
        message: "Branch name",
        placeholder: "main",
      })) as string;

      await execa("git", ["init", "-b", branchName]);
    }

    await execa("git", ["remote", "add", "origin", remoteUrl]);
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
    const { stdout } = await execa("git", ["ls-files", "-m", "--other", "--exclude-standard"]);

    intro(chalk.green("Some files have been modified."));

    if (stdout.length == 0) {
      cancel("No files to add.");
      process.exit(0);
    }

    const files = stdout.split("\n"); /** .map((line) => line.slice(3)); */

    const filesToAdd = (await multiselect({
      message: "Select the ones you want to add.",
      options: [...files.map((file) => ({ value: file, label: file })), { value: "All", label: "All" }],
      required: false,
    })) as string[];

    if (filesToAdd.includes("All")) {
      await execa("git", ["add", "."]);
      outro(`Added ${filesToAdd.length} files.`);
    } else {
      filesToAdd.forEach(async (file) => await execa("git", ["add", file]));
      outro(`Added ${filesToAdd.length} files.`);
    }
  }

  export async function commit() {
    var desc = "";
    intro("git commit");
    const commitMsg = (await text({
      message: "Commit message",
      placeholder: "Enter commit message",
    })) as string;

    const descNeeded = await confirm({
      message: "Do you want to add a description?",
    });

    if (descNeeded) {
      desc = (await text({
        message: "Description",
        placeholder: "Enter description",
      })) as string;
      console.log(desc);
    }

    execa("git", ["commit", "-m", commitMsg, descNeeded ? "-m" : "", descNeeded ? desc : ""]);
    outro(`Commited with message: ${commitMsg}`);
    console.log(commitMsg);
  }
}
