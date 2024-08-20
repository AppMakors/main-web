# GitHub 101
**このブログ記事はGit初心者向けのもので、GitとGitHubを使用してプロジェクト（具体的にはコード）の管理に役立つヒントが含まれています。**

私は学校で、GitHub上でソースコードを管理する必要があるいくつかのコース（オブジェクト指向プログラミング、基本ネットワークプログラミング、モバイルアプリケーション開発など）を受講しました。この記事では、学校での学習中に得たGitHubの使用経験を共有します。

## 基本的な概念
### リモートリポジトリとローカルリポジトリ：
- 簡単に言うと、リモートリポジトリはGitHubのウェブサイトにアップロードされたプロジェクトです。一方、ローカルリポジトリは私たちのコンピュータ内にあるフォルダーとして存在するプロジェクトです。

- 詳細は[こちらのリンク](https://nulab.com/learn/software-development/git-tutorial/git-basics/repositories/remote-repositories-vs-local-repositories/#:~:text=A%20remote%20repository%20is%20hosted,machine%20for%20an%20individual%20user)をご覧ください。

### ブランチ
- ブランチについては多くのウェブサイトで説明されていますが、この記事では最も適切だと感じた定義を紹介します：

    - Gitのブランチは基本的に独立した開発ラインです。新しい機能の作業やバグ修正の際に、他のメンバーの作業とは別に作業を行うためにブランチを使用することができます。
    - さらにブランチには他にも多くの用途がありますが、ここでは説明しません。
- 詳細は[こちらのリンク](https://nulab.com/vi/learn/software-development/git-tutorial/git-collaboration/branches/what-is-a-git-branch/)をご覧ください。

### Git Bash
- Git Bashは、ユーザーが入力するGitコマンドを処理するためのコマンドラインインターフェース（CLI）です。
- 現在では、多くのIDEにGitツールが統合されており（例：Visual Studio Code、Android Studioなど）、いくつかのクリックだけで多くのGitコマンドを実行できます。
- しかし、私は手動でGitコマンドを使用する方が好きなので、この記事では主に以下のGitコマンドの使い方を説明します：

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
まず最初に理解しておくべきことは、コードをリモートリポジトリにプッシュしたい場合、Gitは直接プッシュするのではなく、コードを「箱」にパッケージ化し、いくつかの手続きを経てからプッシュするということです。このコマンドは、その「箱」に変更されたファイルを追加するために使用されます。

[Gitの公式サイト](https://git-scm.com/docs/git-add)には多くのオプションがサポートされていますが、初心者向けには以下の2つの簡単なコマンドがあります：
```bash
git add . #ディレクトリ内のすべての変更ファイルを追加
git add <filename> #指定されたファイル名だけを追加
```

## git commit
次に、その「箱」に「送る理由」または変更の意味を記すメモを追加するためのコマンドです：
```bash
git commit -m "<commit message>"
```
チームで作業する際には、変更の内容を簡単に管理できるように意味のあるメッセージを書く必要があります。FreeCodeCampの[この記事](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)を参考に、メッセージの書き方に関する規則を以下にまとめました：
```
1. feat - 新機能
例："feat: run timer", "feat: competition mode"

2. fix - バグ修正
例："fix: time is not correct", "fix: wrong file path"

3. refactor - リファクタリング
変数名、クラス名、コメントの変更など、新機能追加やバグ修正を伴わない変更に使用
例："refactor: change timor -> timer", "refactor: comment changes"

4. chore - 雑用
Dependencyファイル、Configファイル、Nugetなど、ソースコード外の変更に使用
例："chore: add Newtonsoft.Json package", "chore: remove HtmlAgilityPack package"

5. docs - ドキュメントの変更
例："docs: upload README.md", "docs: update README.md"

6. style - コードスタイル
コードの意味や動作に影響を与えない形式変更
例："style: change braces formatting", "style: change operators/operands formatting"

7. revert - コミットの取り消し
簡単に言えば、前の更新を取り消すこと
例："revert: revert to 25b2630", "revert: revert to previous commit"

8. perf - パフォーマンス改善
例："perf: using quick sort instead of bogo sort", "perf: two for loops -> one for loop"

9. test - 未知

10. ci - 未知

11. build - 未知
```

## git push
「箱」にパッケージ化し、「送る理由」を書いたら、「箱」は送る準備が整います。それを実行するためには、以下のコマンドを使用します：
```bash
git push #コミットをリモートリポジトリにプッシュ
```
ただし、リポジトリの最初のプッシュ時には、このコマンドは使用できません。その場合、以下のコマンドを使用します：
```bash
git push --set-upstream origin <branch_name> #次回以降のプッシュのためにbranch_nameのupstreamを設定し、プッシュ
```
もう少し高度なプッシュコマンド：
```bash
git push --force #リモートリポジトリの更新を無視して現在のコミットを強制的にプッシュ
```
- 上記のコマンドは、単独では使用しないことをお勧めします。
- このコマンドは通常、リモートリポジトリを以前のバージョンに戻すために[git reset --hard](#git-reset)コマンドと一緒に使用されます。例：
    ```bash
    git reset --hard f5e8939 #idがf5e8939のコミットに戻る
    git push --force #現在のローカルリポジトリの状態を強制的にプッシュ
    ```
**まとめ:** ここまでで、基本的なGitコマンドであるgit add、git commit、git pushの3つを紹介しました。これら3つの基本コマンドを組み合わせて、ローカルリポジトリからリモートリポジトリにコードをアップロードまたは更新することができます。以下はその例です：
```bash
git add .
git commit -m "feat: run timer"
git push
```
## git checkout
他の3つのコマンドとは異なり、このコマンドは非常にシンプルで使いやすいです。簡単に言うと、このコマンドはリモートおよびローカルリポジトリに存在する[ブランチ](#branch)の間を切り替えるために使用されます。以下は関連するコマンドです：
```bash
git checkout -b <branch_name> # ブランチを作成してそのブランチに切り替える
git checkout <branch_name> # リモート/ローカルリポジトリに存在するブランチに切り替える
git checkout <branch_name> -- # 作業ディレクトリ内に同名のディレクトリが存在する場合にブランチに切り替える
```
**注意:** 最初のコマンドでは、ブランチを作成した後、自動的にそのブランチに切り替わります。この時点で、作業ディレクトリに変更はありません。これは、Gitがデフォルトで新しいブランチを作成し、現在のブランチのすべての内容、状態、コミットを新しいブランチに持ってくるためです。

## git branch
このコマンドは、ローカルでどの[ブランチ](#branch)で作業しているかを確認するためによく使用します：
```bash
git branch # ローカルにあるすべてのブランチを表示
git branch -a # リモートおよびローカルリポジトリにあるすべてのブランチを表示
```
## git pull
このコマンドは、[git push](#git-push)コマンドの逆の動作をします。このコマンドは、リモートリポジトリからローカルリポジトリに変更を「引っ張る」ために使用されます。これらの変更は、他のユーザーが自分の変更をリモートリポジトリにプッシュした結果生じます。
```bash
git pull # リモートリポジトリの変更をローカルリポジトリに引っ張る
```
## git merge
このコマンドは少し複雑です。簡単に理解するために、以下の例を紹介します：

- ユーザーPhiが「timer_layout」というブランチでコードを実行しました。
- その後、ユーザーKhôiに「timer_layout」ブランチから新しいブランチ「timer_running」を作成し、タイマーの実行機能を実装するように指示されました。
- Khôiがタイマー実行機能を実装した後、Phiはレイアウトを再調整してタイマーが見やすくなるように（フォント、配置など）したいと考えています。
- しかし、現時点では「timer_layout」ブランチにKhôiが実装したタイマー実行機能はまだありません。
- したがって、Phiは次のコマンドを実行する必要があります：
    ```bash
    git checkout timer_layout # 「timer_layout」ブランチに切り替える
    git merge timer_running # 「timer_running」ブランチのすべての変更を「timer_layout」ブランチに統合する
    ```
- 上記の2つのコマンドを実行すると、「timer_layout」ブランチにタイマー実行機能が追加され、Phiはレイアウトの調整を続けることができます。

要するに、"git merge"は、あるブランチの変更を別のブランチに統合するために使用されます。上記の例では、「timer_running」ブランチの変更を「timer_layout」ブランチに統合しています。
```bash
git merge <branch_name> # <branch_name>の変更を作業ブランチに統合する
```
## git clone
ウェブ上からリポジトリをダウンロードする方法に疑問を持つ方もいるでしょう。「Download ZIP」ボタンをクリックしてリポジトリをダウンロードする方法もありますが、開発者としてはそうするべきではありません。コマンドを使ってプロフェッショナルな姿勢を示すべきです。
```bash
git clone <url_to_repo> # URLからリポジトリをクローンする
```
## git fetch
かつてはこのコマンドを[git pull](#git-pull)の代わりに使っていましたが、その意味が理解できなかったため、もう使わなくなりました。意味が理解できないため、このコマンドについてはこの記事に記載しません。

## git revert
[git fetch](#git-fetch)と同様に、このコマンドもまだ理解していません。

## git reset
このコマンドの目的は、ユーザーがプッシュした過去のコミットに戻ることです：
```bash
git reset <commit_id> # 特定のIDを持つコミットに戻る
```
- このコマンドは過去のコミットに戻るために使用されますが、ローカルリポジトリで行ったすべての変更は***保持されます***。
- コミットのIDは7文字で構成されており、各文字は数字または小文字のアルファベットです。

次のコマンドも同様の目的を持ちますが、より危険です：
```bash
git reset --hard <commit_id> # 特定のIDを持つコミットに戻る
```
- このコマンドは過去のコミットに戻るために使用されますが、ローカルリポジトリで行ったすべての変更は***削除されます***。
- このコマンドは一人で使用することは**推奨されません**。
- このコマンドは通常、[git push --force](#git-push)コマンドと一緒に使用され、リモートリポジトリを前のバージョンに戻すために使用されます。例は[git push](#git-push)セクションに記載されています。

**注意:**

- このコマンドは**非常に危険**ですので、使用前に完全に理解してから使用してください！
- 上記の2つのコマンドは、ローカルリポジトリのみで変更を行います。リモートに変更を反映させるには、[git push](#git-push)コマンドを使用する必要があります。

## git status
このコマンドは、ローカルリポジトリの状態（または変更）をリモートリポジトリと比較するために使用されます：
```bash
git status # ローカルリポジトリの変更を表示
```
変更には以下が含まれます：

- 編集されたファイル。
- 追加されたファイル。
- 削除されたファイル。

## git log
私たちは、GitHubのウェブサイトでリモートリポジトリのコミット履歴を完全に確認することができます。しかし、そのコミット履歴にアクセスするまでにはかなりの手順と時間がかかります。そのため、ローカルリポジトリで作業しているときに、コミット履歴をより迅速に確認するためのコマンドがあります。
```bash
git log #リポジトリのコミット履歴を確認する
```

## GitHubの使用経験
学校のプロジェクトを管理するためにGitHubを使用してきた経験から、いくつかのヒントを共有します：

- プロジェクトやチーム、会社のプロジェクトに「秘密情報」（例：APIのaccess_token、メール送信用のapp password、client_secretなど）が含まれている場合、.gitignoreファイルに正規表現の行を追加して、これらの秘密情報をプッシュ時に自動的に無視するようにします。変更をリモートリポジトリにプッシュした後、この正規表現行が有効になります。
    ```
    .gradle/ # ".gradle"という名前のフォルダを無視
    .vscode/ # ".vscode"という名前のフォルダを無視
    vole_secrets.json # "vole_secrets.json"という名前のファイルを無視
    .+.pem # 拡張子が".pem"のファイルを無視
    ```
- 秘密情報を含むファイルは、E2EE（エンドツーエンド暗号化）をサポートするメッセージングアプリ（例：Telegram、WhatsAppなど）を使用してプロジェクトメンバーと共有することをお勧めします。MessengerやZaloはエンドツーエンド暗号化をサポートしていると主張していますが、信頼しない方がいいでしょう。

## 参考文献
1. [Remote repositories vs. local repositories](https://nulab.com/learn/software-development/git-tutorial/git-basics/repositories/remote-repositories-vs-local-repositories/#:~:text=A%20remote%20repository%20is%20hosted,machine%20for%20an%20individual%20user)
2. [Nhánh Git là gì?](https://nulab.com/vi/learn/software-development/git-tutorial/git-collaboration/branches/what-is-a-git-branch/)
3. [git add](https://git-scm.com/docs/git-add)
4. [How to Write Better Git Commit Messages – A Step-By-Step Guide](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)

[writtenDay]: <2024/06/18>