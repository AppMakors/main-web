# Github 101
**Bài blog này dành cho những người mới bắt đầu sử dụng Git, bài viết này bao gồm những mẹo hữu ích để quản lý project (cụ thể là quản lý code) sử dụng Git và GitHub.**

---

Xin chào, có lẽ ai trong giới lập trình viên cũng đã từng nghe qua "Git" và "GitHub", nhưng chỉ một số ít người có thể áp dụng nó hiệu quả trong trong công việc, bài blog này sẽ làm sáng tỏ cách Git và GitHub hoạt động và làm để nào để bạn có thể dùng nó để "thống trị" con đường làm dev của bạn.



## Những khái niệm cơ bản
### Remote Repository và Local Repository:
- Hiểu một cách đơn giản thì Remote Repository là một project nào đó của chúng ta đã được đăng trên website của GitHub. Còn Local Reposity cũng là một project nào đó của chúng ta nhưng lúc này nó là một folder nằm "nội bộ" trên máy tính của chúng ta.

- Theo dõi [link](https://nulab.com/learn/software-development/git-tutorial/git-basics/repositories/remote-repositories-vs-local-repositories/#:~:text=A%20remote%20repository%20is%20hosted,machine%20for%20an%20individual%20user) này để biết thêm chi tiết.

### Branch
- Có rất nhiều giải thích về nhánh (branch) trên các trang web. Tuy nhiên, ở bài viết này mình xin lấy ra một khái niệm về branch mà mình thấy hợp lý nhất:

    - Một nhánh Git về cơ bản là một dòng phát triển độc lập. Bạn có thể sử dụng phân nhánh khi làm việc trên các tính năng mới hoặc sửa lỗi để tách biệt công việc của bạn khỏi công việc của các thành viên khác trong nhóm.
    - Ngoài ra branch có thể còn có nhiều công dụng khác nữa nhưng mình chưa biết đến.
- Theo dõi bài [link](https://nulab.com/vi/learn/software-development/git-tutorial/git-collaboration/branches/what-is-a-git-branch/) này để biết thêm chi tiết.

### Git Bash
- Git Bash là một giao diện dòng lệnh (CLI - Command Line Interface) hỗ trợ xử lý các câu lệnh git do người dùng nhập vào.
- Ngày nay, đa số các IDE đều tích hợp sẵn các công cụ Git ở trong, điều đó giúp cho chúng ta có thể làm nhiều câu lệnh git chỉ với vài cú nhấp chuột. Ví dụ như: Visual Studio Code, Visual Code, Android Studio,...
- Tuy là các IDE có tích hợp sẵn, nhưng bản thân mình vẫn thích sử dụng các câu lệnh git một cách thủ công hơn. Vì vậy, bài viết này chủ yếu sẽ hướng dẫn các bạn cách sử dụng các câu lệnh git.

## git add [options]...
Đầu tiên, chúng ta phải hiểu rằng, khi muốn đẩy code của mình lên Remote repo, Git không trực tiếp đẩy lên thông qua một lệnh mà nó sẽ "đóng gói" vào một cái thùng (hiểu sơ là vậy), sau đó làm một số thủ tục thì mới có thể đẩy lên. Thì lệnh này được dùng để bỏ các file có sự thay đổi vào "cái thùng" đó.

Trên trang chủ của [git](https://git-scm.com/docs/git-add), có rất nhiều options được hỗ trợ, tuy nhiên, cho người mới bắt đầu, có 2 câu lệnh đơn giản như sau:

    git add . #add hết tất cả các files có thay đổi trong directory đang dùng
    git add <filename> #chỉ add filename được liệt kê



## git commit
Tiếp theo, để cái thùng đó có "lý do gửi đi" hoặc hiểu đơn giản là một cái ghi chú cho sự thay đổi của code có ý nghĩa gì, ta sẽ có lệnh này:

    git commit -m "<commit message>"

Khi làm việc nhóm, chúng ta cần viết những ghi chú có ý nghĩa để dễ kiểm soát sự thay đổi của source, theo [bài viết này](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/) ở FreeCodeCamp, mình đã tổng hợp được các quy ước khi viết ghi chú như sau:

    1. feat - tính năng mới
    Ví dụ: "feat: run timer", "feat: competition mode"

    2. fix - sửa lỗi
    Ví dụ: "fix: time is not correct", "fix: wrong file path"

    3. refactor - cấu trúc lại
    Được dùng khi bạn thay đổi tên biến, tên lớp, comment,... mà không thêm tính năng mới hay sửa lỗi gì
    Ví dụ: "refactor: change timor -> timer", "refactor: comment changes"

    4. chore - những việc lặt vặt
    Được dùng khi có những thay đổi bên ngoài source code, mà liên quan tới các file Dependency, file Config, Nuget,...
    Ví dụ: "chore: add Newtonsoft.Json package", "chore: remove HtmlAgilityPack package"

    5. docs - những thay đổi liên quan tới "tài liệu" hoặc hướng dẫn của phần mềm
    Ví dụ: "docs: upload README.md", "docs: update README.md"

    6. style - nghe là biết rồi
    Được dùng khi không thay đổi gì liên quan đến ngữ nghĩa hay cách hoạt động của code mà chỉ là format lại code sao cho nhìn nó đẹp hơn
    Ví dụ: "style: change braces formatting", "style: change operators/operands formatting"

    7. revert - quay lại commit trước
    Hiểu đơn giản giống như "ctrl-z" lại các cập nhật trước đó
    Ví dụ: "revert: revert to 25b2630", "revert: revert to previous commit"

    8. perf - những thay đổi liên quan đến cải thiện hiệu năng
    Ví dụ: "perf: using quick sort instead of bogo sort", "perf: two for loops -> one for loop"

    9. test - chưa biết rõ

    10. ci - chưa biết rõ

    11. build - chưa biết rõ



## git push
Sau khi đã "đóng gói" vào thùng và đã viết "lý do gửi đi" lên thùng. Lúc này "thùng hàng" của chúng ta đã sẵn sàng để được gửi đi. Để làm được điều đó thì ta cần phải sử dụng câu lệnh sau:

    git push #đẩy commit lên remote reposiory

Tuy nhiên, vào lần push đầu tiên của một repo, ta không thể sử dụng câu lệnh trên được, mà chúng ta sẽ sử dụng câu lệnh sau:

    git push --set-upstream origin <branch_name> #thiết lập "upstream" trên branch_name cho những lần push tiếp theo và push

Bổ sung thêm một câu lệnh push **nâng cao** hơn một chút:

    git push --force #force push những commits hiện tại mặc kệ những update trên remote repository

- Câu lệnh trên **không được khuyên dùng** khi sử dụng một mình.
- Câu lệnh này thường được sử dụng với câu lệnh [git reset --hard](#git-reset) để đưa remote repository về một phiên bản trước. Sau đây là một ví dụ:

        git reset --hard f5e8939 #quay lại commit có id là f5e8939
        git push --force #force push trạng thái hiện tại của local repo

**Tạm kết:** Tính cho đến hiện tại, bài viết này đã đi qua 3 câu lệnh git cơ bản: git add, git commit, git push, mình hay gọi là "3 câu lệnh huyền thoại". Từ 3 câu lệnh cơ bản này, ta có thể kết hợp chúng lại với nhau để đưa hoặc cập nhật source code của chúng ta từ local repository lên remote repository. Sau đây là một ví dụ:

    git add .
    git commit -m "feat: run timer"
    git push

## git checkout
Khác với 3 câu lệnh trên, câu lệnh này rất dễ hiểu và dễ xài, hiểu đơn giản thì câu lệnh này được sử dụng cho việc chuyển đổi giữa các [branch](#branch) có trên remote cũng như là local repository. Sau đây là các câu lệnh liên quan:

    git checkout -b <branch_name> #tạo một branch và nhảy sang nó
    git checkout <branch_name> #nhảy sang một branch có sẵn trên remote/local repo
    git checkout <branch_name> -- #nhảy sang một branch có sẵn, trong trường có tồn tại một thư mục cùng tên trong working directory
**Lưu ý:** Đối với câu lệnh đầu tiên, sau khi tạo xong branch và Git sẽ tự động nhảy sang branch đó cho chúng ta. Lúc này bạn sẽ thấy không có sự thay đổi nào cả trong working directory. Đó là bởi vì theo mặc định, Git sẽ tạo branch mới và mang toàn bộ những nội dung, trạng thái, commits từ branch **hiện tại** sang branch **vừa mới tạo**.

## git branch
Mình thường dùng câu lệnh này để xem mình đang hoạt động trên [branch](#branch) nào ở local bằng cách gõ:

    git branch #hiển thị tất cả các branch có trên local
    git branch -a #hiển thị tất cả các branch có trên remote/local repo

## git pull
Cách hoạt động của câu lệnh này là ngược lại với câu lệnh [git push](#git-push). Câu lệnh này thường được sử dụng để "kéo" những thay đổi có trên remote repository về local repository. Những thay đổi đó thường là do người dùng khác push những thay đổi của họ lên.

    git pull #kéo những thay đổi có trên remote repository về local repository

## git merge
Câu lệnh này khá phức tạp. Để hiểu đơn giản thì mình sẽ cho một ví dụ như sau:

- Người dùng Phi đã thực hiện code trên branch có tên là "timer_layout".
- Sau đó người dùng Khôi được giao một việc là: từ branch "timer_layout" đó, hãy tạo một branch mới có tên là "timer_running" và thực hiện chức năng chạy timer.
- Sau khi người dùng Khôi đã thực hiện xong chức năng chạy timer, người dùng Phi muốn tiếp tục chỉnh sửa layout để cho thời gian chạy nhìn đẹp hơn (font chữ, căn chỉnh,...).
- Nhưng hiện tại trên branch "timer_layout" chưa có chức năng chạy timer do người dùng Khôi làm.
- Vậy người dùng Phi cần thực hiện câu lệnh:

        git checkout timer_layout #nhảy qua branch "timer_layout"
        git merge timer_running #đưa tất cả những "thứ mới" bên timer_running sang timer_layout
- Sau 2 câu lệnh trên, branch "timer_layout" đã có thêm chức năng chạy timer để người dùng Phi có thể tiếp tục chỉnh sửa layout.

Tóm lại, "git merge" được dùng để bổ sung các thay đổi từ nhánh này sang nhánh khác, cụ thể là từ nhánh "timer_running" sang "timer_layout" ở ví dụ trên.

    git merge <branch_name> #đưa tất cả những thay đổi có trên branch_name đến working branch

## git clone
Chắc hẳn mọi người cũng thắc mắc làm thế nào để tải một repository trừ trên web về máy tính của mình. Có một cách rất dễ đó là vào repository cần tải trên web sau đó tìm kiếm nút "Download ZIP". Nhưng vì là một lập trình viên, chúng ta không nên làm thế. Chúng ta nên sử dụng lệnh để thể hiện được "sự chuyên nghiệp của một lập trình viên".

    git clone <url_to_repo> #clone repository từ một URL về máy

## git fetch
Câu lệnh này ngày xưa mình đã từ xài thay thế cho câu lệnh [git pull](#git-pull), nhưng vì không hiểu rõ ý nghĩa của nó nên mình đã không còn xài nữa. Vì không hiểu rõ ý nghĩa nên mình xin phép không viết trong bài viết này.

## git revert
Cũng như câu lệnh [git fetch](#git-fetch), câu lệnh này mình cũng chưa hiểu rõ.

## git reset
Công dụng của câu lệnh này là dùng để quay lại một commit trong quá khứ do người dùng push lên:

    git reset <commit_id> #dùng để quay lại commit có một id cụ thể
- Câu lệnh này dùng để quay lại một commit trong quá khứ, tuy nhiên sẽ ***giữ lại*** toàn bộ nội dung mà mình đã thay đổi trên local repository. 
- ID của một commit bao gồm 7 ký tự, mỗi ký tự có thể là một chữ số hoặc một chữ cái viết thường.

Câu lệnh tiếp theo cũng có cùng công dụng với câu lệnh ở trên, tuy nhiên có mức độ nguy hiểm cao hơn:

    git reset --hard <commit_id> #dùng để quay lại commit có một id cụ thể
- Câu lệnh này dùng để quay lại một commit trong quá khứ, tuy nhiên sẽ ***xóa*** toàn bộ nội dung mà mình đã thay đổi trên local repository.
- Câu lệnh này **không được khuyên dùng** khi sử dụng một mình.
- Câu lệnh này thường được sử dụng với câu lệnh [git push --force](#git-push) để đưa remote repository về một phiên bản trước. Ví dụ đã có trên mục câu lệnh [git push](#git-push).

**Lưu ý:**

- Câu lệnh này **khá nguy hiểm**, cần phải hiểu rõ trước khi xài!!!
- Sau 2 câu lệnh nêu trên thì những thay đổi chỉ được thực hiện trên local repository. Để đưa những thay đổi lên remote thì ta cần phải dùng câu lệnh [git push](#git-push).

## git status
Câu lệnh này được dùng để xem trạng thái (hay những thay đổi) của local repository so với remote repository:

    git status #xem những thay đổi được thực hiện trên local repo

Những thay đổi bao gồm:

- Các file đã được thay chỉnh sửa code.
- Các file được thêm vào.
- Các file được xóa đi.

## Kinh nghiệm khi sử dụng GitHub
Sau một thời gian sử dụng GitHub để quản lý những đồ án trên trường của mình, mình đã rút ra được một số kinh nghiệm như sau:

- Khi một dự án của bạn, của nhóm hoặc của công ty bạn làm việc có thứ gọi là "bí mật" ở trong (ví dụ: access_token cho API, app password sử dụng để gửi mail, client_secret,..). Hãy nhớ thêm một dòng Regular Expression vào file ".gitignore" để Git giúp bạn tự động qua những "bí mật" khi push code, sau đó đẩy những thay đổi trong file ".gitignore" lên remote repository. Sau khi hoàn thành, lúc này dòng RegEx vừa mới được thêm vào file ".gitignore" mới hoạt động được.

        .gradle/ #bỏ qua folder có tên là ".gradle"
        .vscode/ #bỏ qua folder có tên là ".vscode"
        vole_secrets.json #bỏ qua file có tên là "vole_secrets.json"
        .+.pem # bỏ qua các file có phần mở rộng là ".pem"
- Về cái file chứa "bí mật", bạn nên gửi nó cho những người làm đồ án chung thông qua những ứng dụng nhắn tin cố mã hóa đầu cuối (E2EE - End to End Encrytion), ví dụ như: Telegram, WhatsApp,.... Messenger, Zalo có tính năng mã hóa đầu cuối cho cuộc trò chuyện, tuy nhiên đừng tin nó.