import { execa } from "execa";
import chalk from "chalk";
import { existsSync } from "fs";
import { cancel, confirm, intro, isCancel, multiselect, outro, spinner, text } from "@clack/prompts";
import { Cancel } from "./clacks.js";

namespace Git {
  /**
   * Initializes a new Git repository.
   */
  export async function init(): Promise<void> {
    intro(chalk.hex("#ff8c00")("New Git repository"));
    const remoteUrl = (await text({
      message: "Remote url",
      placeholder: "https://github.com/USERNAME/REPO",
    })) as string;

    Cancel(remoteUrl);

    const changedBranchName = await confirm({
      message: "By default, the branch is named main, do you want to change it?",
    });

    Cancel(changedBranchName);

    if (changedBranchName) {
      const branchName = (await text({
        message: "Branch name",
        placeholder: "main",
      })) as string;

      Cancel(branchName);

      await execa("git", ["init", "-b", branchName]);
    }

    await execa("git", ["remote", "add", "origin", remoteUrl]);
  }

  /**
   * Checks if the current directory is a git repository. If not, prompts the user to create a new repository.
   */
  export async function checkForRepository(): Promise<void> {
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

  /**
   * Adds modified files to the git index.
   * @param all - If true, adds all modified files. If false, prompts the user to select which files to add.
   */
  export async function add(all?: boolean): Promise<void> {
    checkForRepository();
    const { stdout } = await execa("git", ["ls-files", "-m", "--other", "--exclude-standard"]);

    if (all) {
      intro(chalk.hex("#ff8c00")("GiTools Add"));
      await execa("git", ["add", "."]);
      outro(`Added ${stdout.split("\n").length} files.`);
      process.exit(0);
    }

    intro(chalk.hex("#ff8c00")("GiTools Add"));

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

    if (isCancel(filesToAdd)) {
      outro(chalk.red("Exited"));
      process.exit(0);
    }

    if (filesToAdd.includes("All")) {
      await execa("git", ["add", "."]);
      outro(`Added ${files.length} files.`);
    } else {
      await execa("git", ["add", ...filesToAdd]);
      outro(`Added ${filesToAdd.length} files.`);
    }
  }

  /**
   * Commits changes to the git repository.
   */
  export async function commit(): Promise<void> {
    checkForRepository();
    var desc = "";
    intro(chalk.hex("#ff8c00")("GiTools Commit"));
    const commitMsg = (await text({
      message: "Commit message",
      placeholder: "Enter commit message",
    })) as string;

    if (commitMsg.length > 72) {
      outro(chalk.red("Message too long (only 72 characters allowed)"));
      process.exit(0);
    }

    Cancel(commitMsg);

    const descNeeded = await confirm({
      message: "Do you want to add a description?",
    });

    Cancel(descNeeded);

    if (descNeeded) {
      desc = (await text({
        message: "Description",
        placeholder: "Enter description",
      })) as string;

      await execa("git", ["commit", "-m", commitMsg, "-m", desc]);
      outro(`Commited with message: ${commitMsg}`);
      process.exit(0);
    }

    Cancel(desc);

    await execa("git", ["commit", "-m", commitMsg]);
    outro(`Commited with message: ${commitMsg}`);
  }

  export async function push() {
    checkForRepository();
    intro(chalk.hex("#ff8c00")("GiTools Push"));
    const s = spinner();
    const branch = (await execa("git", ["branch", "--show-current"])).stdout;
    const remote = (await execa("git", ["remote"])).stdout;
    const remoteUrl = (await execa("git", ["remote", "get-url", remote])).stdout;
    const push = await confirm({
      message: `Push to ${remoteUrl} on branch ${branch}?`,
    });

    Cancel(push);

    if (push) {
      s.start("Pushing...");
      const { stdout } = await execa("git", ["push", "-u", remote, branch]);
      s.stop("Done");
      outro(stdout);
      process.exit(0);
    } else {
      outro(chalk.red("Exited"));
      process.exit(0);
    }
  }
}

export default Git;
