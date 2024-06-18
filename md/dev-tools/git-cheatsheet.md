---
{
  "title": "Git Cheatsheet",
  "draft": true,
  "created_at": "2024-06-15",
  "category": "Dev Tools",
  "tags": ["Git"],
  "description": "Common git commands"
}
---



## Git Fetch VS Git Pull

`git fetch` and `git pull` are two commands used in Git for updating local copies of remote repositories, but they serve different purposes and operate in slightly different ways:

### Git Fetch

- **What it does:** `git fetch` downloads commits, files, and refs from a remote repository into your local repo. Fetching is great for getting a fresh view on all the things that happened in a remote repository.
- **Result:** After running `git fetch`, you will have all the branches from the remote, updated with all their latest commits. However, it does not affect your working directory or current branch. This gives you a chance to review changes before integrating them into your copy.
- **Usage example:**
  ```bash
  git fetch origin
  ```
  This command fetches all of the branches from the repository. After this, you can switch to an updated branch or inspect the changes without merging them into your own local branches.

### Git Pull

- **What it does:** `git pull` is essentially a combination of `git fetch` followed by `git merge`. When you use `git pull`, Git will attempt to automatically do your work for you. It is contextually equivalent to a `git fetch` immediately followed by a `git merge` of the remote branch into your current branch.
- **Result:** `git pull` will fetch the latest branch information from the remote repository and then automatically merge the remote branch to your current branch. This will bring your local copy of the branch into sync with the remote version.
- **Usage example:**
  ```bash
  git pull origin master
  ```
  This command fetches the `master` branch from the `origin` remote and merges it into the local branch you are currently on.

### Key Differences

- **Operation:** `git fetch` is a safer option that lets you review changes before integrating them, while `git pull` automatically fetches and merges changes from the remote repository to your working directory.
- **Control:** `git fetch` gives you more control over integrating changes at your own pace, whereas `git pull` is more about convenience and automating updates.
- **Impact on Local Changes:** Fetching won’t affect your local environment. Pulling not only downloads new data; it also directly integrates it, which might lead to merge conflicts if there are competing changes.

In practice, you might use `git fetch` if you want to see the changes before merging them into your branch, especially in a collaborative environment where understanding new changes is crucial. `git pull` is more convenient when you are working solo or when you are sure that merging will not disrupt your local development.