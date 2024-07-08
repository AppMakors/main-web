# GitHub 101
**This blog post is for those who are new to using Git. It includes useful tips for managing projects (specifically code management) using Git and GitHub.**

Hello, everyone may have already heard about "Git" and "GitHub", but only few that can apply them effectively into their job, this article will clearify how Git and GitHub works and how you can use it to dominate your development journey.

## Basic Concepts
### Remote Repository and Local Repository:
- Simply put, a Remote Repository is a project that we have posted on the GitHub website. In contrast, a Local Repository is also a project, but it is a folder located "locally" on our computer.

- Follow this [link](https://nulab.com/learn/software-development/git-tutorial/git-basics/repositories/remote-repositories-vs-local-repositories/#:~:text=A%20remote%20repository%20is%20hosted,machine%20for%20an%20individual%20user) for more details.

### Branch
- There are many explanations about branches on various websites. However, in this article, I will take a definition of a branch that I find most reasonable:

    - A Git branch is essentially an independent line of development. You can use branching when working on new features or fixing bugs to separate your work from that of other team members.
    - Besides that, a branch can have many other uses that I have yet to discover.
- Follow this [link](https://nulab.com/vi/learn/software-development/git-tutorial/git-collaboration/branches/what-is-a-git-branch/) for more details.

### Git Bash
- Git Bash is a command line interface (CLI) that supports processing git commands entered by the user.
- Nowadays, most IDEs have integrated Git tools (such as Visual Studio Code, Visual Code, Android Studio, etc.), allowing us to execute many git commands with just a few clicks.
- Although IDEs come with built-in tools, I still prefer to use git commands manually. Therefore, this article will mainly guide you on how to use git commands:

    - [git add](#git-add)
    - [git commit](#git-commit)
    - [git push](#git-push)
    - [git checkout](#git-checkout)
    - [git branch](#git-branch)
    - [git pull](#git-pull)
    - [git merge](#git-merge)
    - [git clone](#git-clone)
    - [git fetch](#git-fetch)
    - [git revert](#git-revert)
    - [git reset](#git-reset)
    - [git status](#git-status)

## git add
First, we must understand that when we want to push our code to a remote repo, Git does not directly push it through a command but "packages" it into a "box" (roughly understood), and then after some procedures, it can be pushed up. This command is used to put the changed files into that "box."

On the [git homepage](https://git-scm.com/docs/git-add), many options are supported; however, for beginners, there are two simple commands as follows:

    git add . #add all changed files in the current directory
    git add <filename> #only add the listed filename

## git commit
Next, for the "box" to have a "reason to be sent" or simply a note explaining the significance of the code change, we have this command:

    git commit -m "<commit message>"

When working in a team, we need to write meaningful notes to easily track source changes. According to [this article](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/) from FreeCodeCamp, I have summarized the conventions for writing notes as follows:

    1. feat - new feature
    Example: "feat: run timer", "feat: competition mode"

    2. fix - bug fix
    Example: "fix: time is not correct", "fix: wrong file path"

    3. refactor - restructuring
    Used when changing variable names, class names, comments, etc., without adding new features or fixing bugs
    Example: "refactor: change timor -> timer", "refactor: comment changes"

    4. chore - miscellaneous tasks
    Used for changes outside the source code, related to Dependency files, Config files, Nuget, etc.
    Example: "chore: add Newtonsoft.Json package", "chore: remove HtmlAgilityPack package"

    5. docs - documentation-related changes
    Example: "docs: upload README.md", "docs: update README.md"

    6. style - as the name suggests
    Used when there are no semantic or functional changes to the code but only to format the code to look better
    Example: "style: change braces formatting", "style: change operators/operands formatting"

    7. revert - revert to previous commit
    Simply understood as "ctrl-z" to undo previous updates
    Example: "revert: revert to 25b2630", "revert: revert to previous commit"

    8. perf - performance-related changes
    Example: "perf: using quick sort instead of bogo sort", "perf: two for loops -> one for loop"

    9. test - not clear yet

    10. ci - not clear yet

    11. build - not clear yet

## git push
After "packing" into a box and writing the "reason for sending" on it, our "box" is ready to be sent. To do that, we need to use the following command:

    git push #push commits to the remote repository

However, for the first push of a repo, we cannot use the above command. Instead, we use the following command:

    git push --set-upstream origin <branch_name> #set "upstream" on branch_name for subsequent pushes and push

An additional, more advanced push command:

    git push --force #force push the current commits regardless of updates on the remote repository

- The above command is **not recommended** to be used alone.
- This command is often used with the [git reset --hard](#git-reset) command to revert the remote repository to a previous version. Here's an example:

        git reset --hard f5e8939 #revert to the commit with id f5e8939
        git push --force #force push the current state of the local repo

**In summary:** So far, this article has covered 3 basic git commands: git add, git commit, and git push, which I often call the "3 legendary commands." From these 3 basic commands, we can combine them to push or update our source code from the local repository to the remote repository. Here's an example:

    git add .
    git commit -m "feat: run timer"
    git push

## git checkout
Unlike the 3 commands above, this command is very easy to understand and use. Simply put, this command is used for switching between [branches](#branch) available on the remote as well as the local repository. Here are the related commands:

    git checkout -b <branch_name> #create a branch and switch to it
    git checkout <branch_name> #switch to an existing branch on the remote/local repo
    git checkout <branch_name> -- #switch to an existing branch, in case there is a folder with the same name in the working directory

**Note:** For the first command, after creating a branch, Git will automatically switch to that branch. At this point, you will not see any changes in the working directory because, by default, Git will create a new branch and carry over all the contents, status, and commits from the **current** branch to the **newly created** branch.

## git branch
I often use this command to see which [branch](#branch) I am working on locally by typing:

    git branch #display all branches on the local repo
    git branch -a #display all branches on the remote/local repo

## git pull
The operation of this command is the opposite of the [git push](#git-push) command. This command is often used to "pull" changes from the remote repository to the local repository. These changes are usually pushed by other users.

    git pull #pull changes from the remote repository to the local repository

## git merge
This command is quite complex. To simplify, I'll give the following example:

- User Phi has been coding on a branch named "timer_layout."
- Then user Khôi is assigned to create a new branch named "timer_running" from the "timer_layout" branch and implement the timer run feature.
- After user Khôi has completed the timer run feature, user Phi wants to continue adjusting the layout to make the running time look better (font, alignment, etc.).
- But currently, the "timer_layout" branch does not have the timer run feature done by user Khôi.
- So user Phi needs to execute the following command:

        git checkout timer_layout #switch to the "timer_layout" branch
        git merge timer_running #bring all the "new things" from timer_running to timer_layout

- After the above two commands, the "timer_layout" branch will have the timer run feature, allowing user Phi to continue adjusting the layout.

In short, "git merge" is used to incorporate changes from one branch to another, specifically from the "timer_running" branch to the "timer_layout" branch in the example above.

    git merge <branch_name> #bring all changes from branch_name to the working branch

## git clone
Surely everyone wonders how to download a repository from the web to their computer. There is a very easy way: go to the repository on the web and look for the "Download ZIP" button. But as a developer, we shouldn't do that. We should use a command to show the "professionalism of a developer."

    git clone <url_to_repo> #clone a repository from a URL to your computer

## git fetch
I used to use this command instead of the [git pull](#git-pull) command, but since I didn't fully understand its meaning, I stopped using it. Since I don't fully understand it, I won't write about it in this article.

## git revert
Similar to the [git fetch](#git-fetch) command, I also don't fully understand this command.

## git reset
The purpose of this command is to revert to a past commit made by a user:

    git reset <commit_id> #revert to the commit with a specific id

- This command is used to revert to a past commit, but it will ***keep*** all the changes made on the local repository.
- The ID of a commit consists of 7 characters, each of which can be a digit or a lowercase letter.

The following command has the same purpose as the above command but is more dangerous:

    git reset --hard <commit_id> #revert to the commit with a specific id

- This command is used to revert to a past commit but will ***delete*** all the changes made on the local repository.
- This command is **not recommended** to be used alone.
- This command is often used with the [git push --force](#git-push) command to revert the remote repository to a previous version. The example has been provided in the [git push](#git-push) command section.

**Note:**

- This command is **quite dangerous**, so make sure to understand it fully before using it!!!
- After the above two commands, the changes are only made on the local repository. To push these changes to the remote repository, we need to use the [git push](#git-push) command.

## git status
This command is used to check the status (or changes) of the local repository compared to the remote repository:

    git status #view the changes made on the local repo

The changes include:

- Files that have been edited.
- Files that have been added.
- Files that have been deleted.

## Experience using GitHub
After using GitHub to manage my school projects, I have gathered the following experiences:

- When your project, your team's project, or your company's project contains "secrets" (e.g., access_token for API, app password for sending mail, client_secret, etc.), remember to add a Regular Expression line to the ".gitignore" file so that Git automatically ignores these "secrets" when pushing code. Then push the changes in the ".gitignore" file to the remote repository. Once completed, the newly added RegEx line in the ".gitignore" file will take effect.

        .gradle/ #ignore folder named ".gradle"
        .vscode/ #ignore folder named ".vscode"
        vole_secrets.json #ignore file named "vole_secrets.json"
        .+.pem #ignore all files with the ".pem" extension

- Regarding the file containing "secrets," you should send it to your team members through end-to-end encrypted (E2EE) messaging applications, such as Telegram, WhatsApp, etc. Messenger and Zalo have end-to-end encryption for conversations, but don't trust them.