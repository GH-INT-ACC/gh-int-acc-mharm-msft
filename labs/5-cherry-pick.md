# Lab 5: Cherry-Picking Commits

In this lab, you're going to use `git cherry-pick` to move commits between
branches.

## Scenario

Let's "accidentally" commit some changes to `main`, then cherry-pick them into a
feature branch and remove the commits from the default branch.

## Task 1: Create a Feature Branch

1. Ensure you are on the `main` branch

   ```bash
   git checkout main
   ```

1. Create a new branch called `feature/new-game`

   ```bash
   git branch feature/new-game
   ```

> [!NOTE]
>
> The difference between `git branch` and `git checkout -b` is that the former
> only creates the branch, while the latter creates the branch and checks it
> out.

## Task 2: Add a Feature

1. Open [`src/keyboard_input_manager.ts`](../src/keyboard_input_manager.ts)
1. Locate the comment `// Lab 5: New Game Button`
1. Add the following code below the comment

   ```ts
   // Lab 5: New Game Button
   KeyboardInputManager.bindButtonPress(
     '.restart-button',
     KeyboardInputManager.restart
   )
   ```

1. Save the file

## Task 3: Commit the Changes

1. Add the changes to the staging area

   ```bash
   git add src/keyboard_input_manager.ts
   ```

1. Commit the changes

   ```bash
   git commit -m "Add new game button listener"
   ```

At this point, the `main` branch has a new commit that is meant for the
`feature/new-game` branch!

## Task 4: Cherry-Pick the Commit

1. Get the commit SHA of the most recent commit on the `main` branch

   ```bash
   git log --oneline -n 1
   ```

   Copy the SHA of the commit.

1. Switch to the `feature/new-game` branch

   ```bash
   git checkout feature/new-game
   ```

1. Cherry-pick the commit from the `main` branch

   Replace `COMMIT_SHA` with the SHA of the commit you copied in the first step.

   ```bash
   git cherry-pick COMMIT_SHA
   ```

## Task 5: Remove the Commit from the Default Branch

1. Switch back to the `main` branch

   ```bash
   git checkout main
   ```

1. Reset `main` to the commit before the new game button listener

   ```bash
   git reset --hard HEAD~1
   ```

1. Verify that latest commit on `main` is no longer the new game button listener
   update

   ```bash
   git log --oneline -n 1
   ```

## Task 7: Merge the `feature/new-game` Branch

1. Merge the `feature/new-game` branch into the `main` branch

   ```bash
   git merge feature/new-game
   ```

1. Push your changes to GitHub

   ```bash
   git push
   ```

1. Navigate to your repository on GitHub.com
1. Click the **Actions** tab
1. Click the running **Deploy to GitHub Pages** workflow
1. Wait for the workflow run to complete
1. Click the **Code** tab
1. Click the link to your game
1. Verify the **New Game** button now restarts the game

## Need Help?

If you're having trouble with any of the steps, you can ask for help in the
meeting chat.

The code changes for this lab can be found in the `solutions` directory.

- Copy the contents of
  [`solutions/5-cherry-pick/keyboard_input_manager.ts`](../solutions/5-cherry-pick/keyboard_input_manager)
  and replace the contents of
  [`src/keyboard_input_manager.ts`](../src/keyboard_input_manager.ts)
