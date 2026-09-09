# Lab 6: Protect the `main` Branch

In this lab, we're going to add a `CODEOWNERS` file, enable branch protections,
and see what happens when we try to push any changes directly to `main`.

## Scenario

Up until this point, we've been pushing changes directly to the default branch,
`main`. When working with multiple developers in the same repo(s), this can
cause many conflicts and other problems.

## Task 1: Create a `CODEOWNERS` File

1. Ensure you're working on the `main` branch

   ```bash
   git checkout main
   ```

1. At the root of the repository, create a new file named `CODEOWNERS` with the
   following contents.

   The class setup replaces the placeholders below with your organization and
   class team. Use the team rather than your username so another participant can
   provide the required code-owner review.

   ```plain
   # Game Project Code Owners

   * @<organization>/<class-team>
   ```

1. Add the `CODEOWNERS` file to the repository

   ```bash
   git add CODEOWNERS
   git commit -m "Add CODEOWNERS file"
   ```

1. Push the changes to GitHub

   ```bash
   git push
   ```

## Task 2: Protect the `main` Branch

1. In your browser, navigate to your repository on GitHub
1. Click on the **Settings** tab
1. Expand **Rules**, then click **Rulesets**
1. Click **New ruleset**, then **New branch ruleset**
1. In the **Ruleset name** text field, enter a name for your ruleset (e.g.
   `Default Branch`)
1. Set the **Enforcement status** to **Active**

   ![New Ruleset](./img/6-new-ruleset.png)

1. In the **Target branches** section, click **Add target**, then click
   **Include default branch!**

   ![Include Default Branch](./img/6-include-default-branch.png)

1. In the **Rules** section, set the following:
   - **Require a pull request before merging:** Enabled
   - **Required approvals:** `1`
   - **Require review from Code Owners:** Enabled

   ![Rules](./img/6-rules.png)

1. Click **Create**

## Task 3: Try to Push Directly to `main`

Now that the `main` branch is protected, let's see what happens when we try to
push changes directly to `main`.

1. In your terminal, make sure you're on the `main` branch

   ```bash
   git checkout main
   ```

1. Make a change to any file in the repository

   For example, you could add a new line to the `README.md` file

   ```markdown
   # GitHub Intermediate - Project Repository

   This is an update to the README.md file!
   ```

1. Add and commit the changes

   ```bash
   git add README.md
   git commit -m "Update README.md"
   ```

1. Push the changes to GitHub

   ```bash
   git push
   ```

   At this point, you should see an error message in your terminal, indicating
   that you cannot push changes directly to the `main` branch.

   ```plain
   remote: error: GH013: Repository rule violations found for refs/heads/main.
   remote: Review all repository rules at https://github.com/<organization>/<repository>/rules?ref=refs%2Fheads%2Fmain
   remote:
   remote: - Changes must be made through a pull request.
   remote:
   To github.com:<organization>/<repository>.git
    ! [remote rejected] main -> main (push declined due to repository rule violations)
   error: failed to push some refs to 'github.com:<organization>/<repository>.git'
   ```

## Task 4: Reset the `main` Branch

1. In your terminal, reset the `main` branch to the previous commit

   ```bash
   git reset --hard HEAD~1
   ```

## Need Help?

If you're having trouble with any of the steps, you can ask for help in the
meeting chat.
