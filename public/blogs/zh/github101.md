# GitHub 101

**这篇博客是为Git新手准备的，文章包含了一些使用Git和GitHub管理项目（尤其是代码管理）的实用技巧。**

在学校学习期间，我经历了几门需要在GitHub上管理源代码的课程，如：面向对象编程、基础网络编程、移动应用开发。因此，在本文中，我将分享一些在学校学习期间使用GitHub的经验。

## 基本概念
### 远程仓库和本地仓库：
- 简单来说，远程仓库是我们发布在GitHub网站上的某个项目。而本地仓库也是我们的某个项目，但此时它是我们电脑上的一个文件夹。

- 请参阅[此链接](https://nulab.com/learn/software-development/git-tutorial/git-basics/repositories/remote-repositories-vs-local-repositories/#:~:text=A%20remote%20repository%20is%20hosted,machine%20for%20an%20individual%20user)了解更多详情。

### 分支
- 关于分支（branch）有很多解释。然而，在本文中，我将采用一个我认为最合理的分支概念：

    - Git分支基本上是一个独立的发展线。你可以在开发新功能或修复错误时使用分支，以将你的工作与团队其他成员的工作分开。
    - 此外，分支还可以有很多其他用途，但我还不清楚。
- 请参阅[此链接](https://nulab.com/vi/learn/software-development/git-tutorial/git-collaboration/branches/what-is-a-git-branch/)了解更多详情。

### Git Bash
- Git Bash是一个命令行界面（CLI），支持用户输入的git命令。
- 如今，大多数IDE都内置了Git工具（例如：Visual Studio Code、Visual Code、Android Studio等），这使得我们可以通过点击几下鼠标来执行许多git命令。
- 尽管IDE已经集成了这些工具，但我个人还是更喜欢手动使用git命令。因此，本文主要将指导你如何使用这些git命令：

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
    - [git log](#git-log)

## git add
首先，我们要明白，当我们想要将代码推送到远程仓库时，Git不会直接通过一个命令推送上去，而是会将其“打包”到一个“箱子”里，经过一些手续后才可以推送上去。此命令用于将有变化的文件放入“箱子”中。

在[git官网](https://git-scm.com/docs/git-add)上，有很多支持的选项，但对于新手，有两个简单的命令如下：
```bash
git add . # 添加当前目录中所有有变化的文件
git add <filename> # 仅添加列出的文件名
```
## git commit
接下来，为了让这个箱子有“发送的理由”或简单地说是一个有意义的代码更改注释，我们使用此命令：
```bash
git commit -m "<commit message>"
```
在团队合作中，我们需要编写有意义的注释，以便于控制代码的更改。根据FreeCodeCamp的[这篇文章](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)，我总结了编写注释的规则如下：
```
1. feat - 新功能
例如：“feat: run timer”，“feat: competition mode”

2. fix - 修复错误
例如：“fix: time is not correct”，“fix: wrong file path”

3. refactor - 重构
用于更改变量名、类名、注释等，而不添加新功能或修复错误
例如：“refactor: change timor -> timer”，“refactor: comment changes”

4. chore - 杂务
用于对依赖文件、配置文件等源代码外部的更改
例如：“chore: add Newtonsoft.Json package”，“chore: remove HtmlAgilityPack package”

5. docs - 与“文档”或软件指南相关的更改
例如：“docs: upload README.md”，“docs: update README.md”

6. style - 顾名思义
用于不改变代码的语义或行为，只是重新格式化代码，使其看起来更美观
例如：“style: change braces formatting”，“style: change operators/operands formatting”

7. revert - 回滚到前一个提交
简单理解为“ctrl-z”上一个更新
例如：“revert: revert to 25b2630”，“revert: revert to previous commit”

8. perf - 与性能改进相关的更改
例如：“perf: using quick sort instead of bogo sort”，“perf: two for loops -> one for loop”

9. test - 还不清楚

10. ci - 还不清楚

11. build - 还不清楚
```
## git push
在“打包”到箱子里并写上“发送的理由”之后，我们的“包裹”就准备好发送了。为此，我们需要使用以下命令：
```bash
git push # 将提交推送到远程仓库
```
然而，在一个仓库的第一次推送中，我们不能使用上述命令，而是要使用以下命令：
```bash
git push --set-upstream origin <branch_name> # 设置 branch_name 的“上游”以便后续推送并进行推送
```
补充一个稍微高级一点的推送命令：
```bash
git push --force # 强制推送当前的提交，无视远程仓库上的更新
```
- 上面的命令**不建议**单独使用。
- 该命令通常与[git reset --hard](#git-reset)命令一起使用，以将远程仓库回滚到之前的版本。以下是一个示例：
    ```bash
    git reset --hard f5e8939 # 回滚到ID为f5e8939的提交
    git push --force # 强制推送本地仓库的当前状态
    ```
**暂时总结：** 目前为止，本文介绍了3个基本的git命令：git add、git commit、git push，我常称之为“3个传奇命令”。通过这3个基本命令，我们可以将本地仓库的源代码上传或更新到远程仓库。以下是一个示例：
```bash
git add .
git commit -m "feat: run timer"
git push
```
## git checkout
与前三个命令不同，这个命令非常容易理解和使用。简单来说，该命令用于在远程仓库和本地仓库之间切换不同的[分支](#branch)。以下是相关的命令：
```bash
git checkout -b <branch_name> # 创建一个分支并切换到该分支
git checkout <branch_name> # 切换到远程/本地仓库中已有的分支
git checkout <branch_name> -- # 切换到已有分支，当工作目录中存在同名目录时使用
```
**注意：** 对于第一个命令，创建分支后，Git会自动切换到该分支。此时，你会发现工作目录中没有任何变化。这是因为Git默认会从**当前分支**将所有内容、状态、提交带到**新创建的分支**中。

## git branch
我通常使用这个命令来查看我在本地的哪个[分支](#branch)上工作，方法如下：
```bash
git branch # 显示本地所有分支
git branch -a # 显示远程/本地仓库中的所有分支
```
## git pull
这个命令的工作原理与[git push](#git-push)相反。该命令通常用于将远程仓库中的更改“拉”到本地仓库。这些更改通常是其他用户将其更改推送到远程仓库后产生的。
```bash
git pull # 将远程仓库中的更改拉到本地仓库
```
## git merge
这个命令比较复杂。为了简单理解，我举一个例子：

- 用户Phi在名为"timer_layout"的分支上进行编码。
- 随后用户Khôi被分配了一项任务：从"timer_layout"分支中创建一个名为"timer_running"的新分支，并实现计时器功能。
- 用户Khôi完成计时器功能后，用户Phi希望继续调整布局，使计时器看起来更美观（字体、对齐等）。
- 但当前"timer_layout"分支上还没有用户Khôi实现的计时器功能。
- 因此，用户Phi需要执行以下命令：
    ```bash
    git checkout timer_layout # 切换到"timer_layout"分支
    git merge timer_running # 将"timer_running"分支中的所有新内容合并到"timer_layout"分支中
    ```
- 通过上述两个命令，"timer_layout"分支添加了计时器功能，以便用户Phi继续调整布局。

总之，"git merge"用于将一个分支的更改合并到另一个分支中，具体来说是将"timer_running"分支的更改合并到"timer_layout"分支中。
```bash
git merge <branch_name> # 将<branch_name>分支中的所有更改合并到当前工作分支
```
## git clone
大家可能会好奇如何将一个远程仓库下载到自己的电脑上。有一个非常简单的方法是在网页上找到“Download ZIP”按钮。但作为一名程序员，我们不应该这样做。我们应该使用命令来展示程序员的“专业精神”。
```bash
git clone <url_to_repo> # 从一个URL克隆仓库到本地
```
## git fetch
这个命令我曾经用来代替[git pull](#git-pull)，但因为不了解它的真正含义，所以我不再使用。由于不清楚其含义，因此在本文中不作介绍。

## git revert
与[git fetch](#git-fetch)一样，我对这个命令也不了解。

## git reset
此命令用于回到用户推送的过去的一个提交：
```bash
git reset <commit_id> # 回到指定ID的提交
```
- 该命令用于回到过去的一个提交，但会***保留***在本地仓库中所做的所有更改。
- 提交的ID包含7个字符，每个字符可以是数字或小写字母。

下一个命令有相同的功能，但更危险：
```bash
git reset --hard <commit_id> # 回到指定ID的提交
```
- 该命令用于回到过去的一个提交，但会***删除***在本地仓库中所做的所有更改。
- 这个命令**不建议**单独使用。
- 这个命令通常与[git push --force](#git-push)命令一起使用，以将远程仓库恢复到之前的版本。示例已在[git push](#git-push)命令部分说明。

**注意：**

- 此命令**相当危险**，使用前需了解清楚！
- 上述两个命令后的更改仅在本地仓库中生效。要将更改推送到远程仓库，需要使用[git push](#git-push)命令。

## git status
此命令用于查看本地仓库相对于远程仓库的状态（或更改）：
```bash
git status # 查看本地仓库中已做的更改
```
更改包括：

- 已修改的文件。
- 新添加的文件。
- 已删除的文件。

## git log
我们完全可以在 GitHub 网站上查看远程仓库的提交历史。然而，这需要经过很多步骤并花费相当多的时间才能进入到提交历史部分。因此，也有命令可以让我们在本地仓库中快速查看提交历史：
```bash
git log #查看仓库的提交历史
```

## 使用GitHub的经验
在使用GitHub管理学校项目一段时间后，我总结了一些经验：

- 当你的项目、团队或公司有“秘密”（例如：API的access_token、发送邮件用的app密码、client_secret等）时，请记得在“.gitignore”文件中添加一行正则表达式，以便Git在推送代码时自动忽略这些“秘密”，然后将“.gitignore”文件的更改推送到远程仓库。完成后，新添加到“.gitignore”文件的正则表达式才能生效。
    ```
    .gradle/ # 忽略名为“.gradle”的文件夹
    .vscode/ # 忽略名为“.vscode”的文件夹
    vole_secrets.json # 忽略名为“vole_secrets.json”的文件
    .+.pem # 忽略扩展名为“.pem”的文件
    ```
- 关于包含“秘密”的文件，你应该通过具有端到端加密（E2EE）的消息应用程序（例如：Telegram、WhatsApp等）将其发送给项目组的其他成员。Messenger、Zalo声称他们的对话具有端到端加密，但不要相信他们。

## 参考资料
1. [Remote repositories vs. local repositories](https://nulab.com/learn/software-development/git-tutorial/git-basics/repositories/remote-repositories-vs-local-repositories/#:~:text=A%20remote%20repository%20is%20hosted,machine%20for%20an%20individual%20user)
2. [Nhánh Git là gì?](https://nulab.com/vi/learn/software-development/git-tutorial/git-collaboration/branches/what-is-a-git-branch/)
3. [git add](https://git-scm.com/docs/git-add)
4. [How to Write Better Git Commit Messages – A Step-By-Step Guide](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)

[writtenDay]: <18/06/2024>