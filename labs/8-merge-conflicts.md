# Lab 8: Merge Conflicts

In this lab, you're going to resolve merge conflicts in the GitHub UI as well as
the command line.

## Scenario

Several teammates have made adjustments to the game to change the difficulty.
It's up to you to review their pull requests, resolve any conflicts, and merge
their changes!

## Task 1: Merge the First Feature Change (GitHub UI)

In this task, you will merge the first feature change in the GitHub UI. After
this, you will see that there is a merge conflict in the second pull request.
You will resolve this conflict in the next task.

1. In your browser, navigate to your repository on GitHub
1. Click on the **Pull requests** tab
1. Open the pull request titled `Increase the number of starting tiles` whose
   head branch is `feature/start-tiles-4`
1. Click the **Files changed** tab

   Note that this PR changes the number of starting tiles in the game.

1. Click **Review changes**
1. Select **Approve**
1. Click **Submit review**

   You will be redirected back to the **Conversation** tab of the PR.

1. Click **Merge pull request**
1. Click **Confirm merge**

## Task 2: Resolve Merge Conflicts (GitHub UI)

Now that the first PR has been merged, you'll see that the second PR has a merge
conflict. In this task, you will resolve this conflict using the GitHub UI.

1. Click on the **Pull requests** tab
1. Open the remaining pull request titled
   `Increase the number of starting tiles`, whose head branch is
   `feature/start-tiles-3`

   Note that the PR has a merge conflict in `src/game_manager.ts`.

1. Click **Resolve conflicts**

   You will be directed to the conflict resolution page. There, you will see the
   changes introduced by the PR, as well as the current changes in the `main`
   branch (the ones you merged in the previous task).

   ```plain
     /** Start Tiles Count */
   <<<<<<< feature/start-tiles-3
     static startTiles: number = 4
   =======
     static startTiles: number = 2
   >>>>>>> main
   ```

   The `<<<<<<<`, `=======`, and `>>>>>>>` lines are conflict markers. The
   `<<<<<<<` line indicates the beginning of the conflicting changes, the
   `=======` line separates the conflicting changes, and the `>>>>>>>` line
   indicates the end of the conflicting changes.

   To resolve the conflict, you need to choose which changes to keep and which
   changes to discard. In this case, you want to keep the changes from the PR
   and discard the changes from `main`.

1. Delete the `<<<<<<<`, `=======`, and `>>>>>>>` lines
1. Delete the changes from `main` (the `static startTiles: number = 2` line)

   The updated lines should look like this:

   ```plain
   /** Start Tiles Count */
   static startTiles: number = 4
   ```

1. Click **Mark as resolved**
1. Click **Commit merge**

   You will be redirected to the **Conversation** tab of the PR. At this point,
   there should no longer be a merge conflict.

1. Click the **Files changed** tab
1. Click **Review changes**
1. Select **Approve**
1. Click **Submit review**

   You will be redirected back to the **Conversation** tab of the PR.

1. Click **Merge pull request**
1. Click **Confirm merge**

## Task 3: Merge the Second Feature Change (Command Line)

In this task, you will merge the first pull request in the GitHub UI. After
this, you will see that there is a merge conflict in the second pull request.
You will resolve this conflict in the next task.

1. In your browser, navigate to your repository on GitHub
1. Click on the **Pull requests** tab
1. Open the pull request titled `Increase rate of tiles with value 4` whose head
   branch is `feature/tile-value-2`
1. Click the **Files changed** tab

   Note that this PR changes the rate that determines the value of new tiles.

1. Click **Review changes**
1. Select **Approve**
1. Click **Submit review**

   You will be redirected back to the **Conversation** tab of the PR.

1. Click **Merge pull request**
1. Click **Confirm merge**

## Task 4: Resolve Merge Conflicts (Command Line)

Now that the first PR has been merged, you'll see that the second PR has a merge
conflict. In this task, you will resolve this conflict using the command line.

1. Click on the **Pull requests** tab
1. Open the remaining pull request titled `Increase rate of tiles with value 4`,
   whose head branch is `feature/tile-value-1`

   Note that the PR has a merge conflict in `src/game_manager.ts`.

1. Open your local clone of the repository
1. Pull the updates to the `main` branch

   ```bash
   git checkout main
   git pull
   ```

1. Switch to the branch for the PR

   ```bash
   git checkout feature/tile-value-1
   ```

1. Merge the `main` branch into the PR branch

   ```bash
   git merge main
   ```

   You will see a message similar to the following:

   ```plain
   Auto-merging src/game_manager.ts
   CONFLICT (content): Merge conflict in src/game_manager.ts
   Automatic merge failed; fix conflicts and then commit the result.
   ```

1. Open `src/game_manager.ts` in your text editor

   You will see that the file has been updated to include conflict markers.

   ```plain
   static addRandomTile(): void {
     if (Grid.cellsAvailable()) {
   <<<<<<< HEAD
       const value = Math.random() < 0.1 ? 2 : 4
   =======
       const value = Math.random() < 0.5 ? 2 : 4
   >>>>>>> main
       const cell = Grid.randomAvailableCell()

       if (cell !== null) Grid.insertTile(new Tile(cell, value))
     }
   }
   ```

   The `<<<<<<<`, `=======`, and `>>>>>>>` lines are conflict markers. The
   `<<<<<<<` line indicates the beginning of the conflicting changes, the
   `=======` line separates the conflicting changes, and the `>>>>>>>` line
   indicates the end of the conflicting changes.

   To resolve the conflict, you need to choose which changes to keep and which
   changes to discard. In this case, you want to keep the changes from the PR
   and discard the changes from `main`.

1. Delete the `<<<<<<<`, `=======`, and `>>>>>>>` lines
1. Delete the changes from `main` (the
   `const value = Math.random() < 0.5 ? 2 : 4` line)

   The updated lines should look like this:

   ```plain
   static addRandomTile(): void {
     if (Grid.cellsAvailable()) {
       const value = Math.random() < 0.1 ? 2 : 4
       const cell = Grid.randomAvailableCell()

       if (cell !== null) Grid.insertTile(new Tile(cell, value))
     }
   }
   ```

1. Add the change to the staging area

   ```bash
   git add src/game_manager.ts
   ```

1. Commit the change

   ```bash
   git commit -m 'Merge main into feature/tile-value-1'
   ```

1. Push the change

   ```bash
   git push
   ```

   The PR will be updated with the new commit that resolves the merge conflict.

1. Navigate to the PR in your browser
1. Refresh the page

   You should see that the PR no longer has a merge conflict.

1. Click the **Files changed** tab

   Note that this PR changes the rate that determines the value of new tiles.

1. Click **Review changes**
1. Select **Approve**
1. Click **Submit review**

   You will be redirected back to the **Conversation** tab of the PR.

1. Click **Merge pull request**
1. Click **Confirm merge**

## Need Help?

If you're having trouble with any of the steps, you can ask for help in the
meeting chat.
