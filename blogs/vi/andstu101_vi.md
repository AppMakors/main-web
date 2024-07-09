# Android Studio 101
**Bài blog này bao gồm những kiến thức cơ bản về Android Studio được tổng hợp sau môn học Phát triển ứng dụng trên thiết bị di động.**

Sớm hơn dự tính, trong học kỳ II của năm hai đại học mình đã được học môn Phát triển ứng dụng trên thiết bị di động với mã môn là NT118. Tuy nhiên, nếu đúng với lộ trình học thì mình sẽ được học môn này ở học kỳ I năm ba. Mình không khuyến khích các bạn học môn này sớm hơn dù chỉ là một học kỳ, bởi vì nó không hề dễ dàng. Theo lời khuyên của cô mình thì môn này nên được học ở học kỳ II năm ba hoặc học kỳ I năm tư.

Trong sơ đồ môn học (sơ đồ kế hoạch giảng dạy) có để môn học trước môn này là Lập trình hướng đối tượng, tuy nhiên mình thấy điều này chưa đúng lắm. Theo mình, để học được môn học này thì chúng ta cần tối thiểu 2 môn học trước là Lập trình hướng đối tượng và Lập trình mạng căn bản. Và thêm môn học Quản trị mạng và hệ thống nếu đồ án của các bạn có triển khai (deployment).

Bài viết này sẽ hơi dài vì kiến thức về Android Studio mình được học trên trường là rất nhiều. Các bạn có thể theo dõi mục lục.

## Mục lục
- [Android Studio 101](#android-studio-101)
  - [Mục lục](#mục-lục)
  - [Android Studio](#android-studio)
  - [XML file trong Android Studio](#xml-file-trong-android-studio)
  - [Components](#components)
  - [Layouts](#layouts)
  - [ListView, GridView và Spinner](#listview-gridview-và-spinner)
  - [Animations](#animations)
  - [Activity](#activity)
  - [Fragment](#fragment)
  - [Intent](#intent)
  - [SQLite](#sqlite)
  - [Broadcast Receiver](#broadcast-receiver)
  - [MultiThreading](#multithreading)
  - [AsyncTask](#asynctask)
  - [Gọi API trong Android Studio](#gọi-api-trong-android-studio)
  - [Tài liệu tham khảo](#tài-liệu-tham-khảo)

## Android Studio
Android Studio là môi trường phát triển tích hợp (IDE) chính thức dành cho phát triển nền tảng Android. Nó được ra mắt vào ngày 16 tháng 5 năm 2013 tại hội nghị Google I/O. Android Studio được phát hành miễn phí theo giấy phép Apache Licence 2.0.

- Các loại file cần biết trong một Android Studio project:
	- Các file .java: các file vận hành.
	- Các file .xml: có thể là một layout hoặc là một file resource, animation,...
	- File build.gradle: khai báo các dependencies, plugins,...

- Cách đặt tên các file .java trong Android Studio:
    - Một activity: NameActivity.java
    - Một fragment: NameFragment.java

- Cách đặt tên các file XML trong Android Studio:
    - Layout cho một Activity: activity_name.xml
    - Layout cho một Fragment: fragment_name.xml
    - Layout cho một item: item_name.xml
    - Cho một animation: anim_name.xml

## XML file trong Android Studio
Định nghĩa XML:
- Wikipedia: XML (viết tắt từ tiếng Anh: eXtensible Markup Language, tức "Ngôn ngữ đánh dấu mở rộng") là ngôn ngữ đánh dấu với mục đích chung do W3C đề nghị, để tạo ra các ngôn ngữ đánh dấu khác.
- Theo mình hiểu: XML và HTML có bản chất giống nhau, vì cả 2 đều là Markup Language (ngôn ngữ đánh dấu). Cách sử dụng XML trong Android Studio cũng giống như cách sử dụng HTML trong WebDev. File XML trong Android Studio có thể làm được khá nhiều thứ:
    - Dùng để thiết kế các layout cho một Activity, Fragment, item trong ListView hoặc 1 dialog.
    - Dùng để ánh xạ từ một ID sang một giá trị String cụ thể (file strings.xml).
    - Dùng để ánh xạ từ một ID sang một giá trị đo lường cụ thể (file dimens.xml).
    - Dùng để thiết kế các animations cho một component hoặc cho chuyển động giữa các activities, fragments (folder anim).

Về phần cách sử dụng các file XML cụ thể, các bạn có thể xem trong mục [Components](#components), [Layouts](#layouts), [ListView, GridView và Spinner](#listview-gridview-và-spinner), [Animations](#animations).

## Components
Các thành phần (components) trong một layout là một đối tượng UI hiển thị trên layout mà người dùng có thể nhìn thấy hoặc thao tác được.

Các thành phần cơ bản trong một layout:
- EditText: text có thể chỉnh sửa.
- TextView: text dùng để hiển thị.
- Button: nút dùng để bấm.
- ImageView: hiển thị một hình ảnh.
- ImageButton: là một cái nút nhưng có thể hiển thị hình ảnh.
- CheckBox: ô vuông dùng để check.
- ProgressBar: hiển thị tiến độ công việc.
- etc...

Các thành phần nâng cao trong một layout:
- ViewPager2: có rất nhiều công dụng, tuy nhiên công dụng duy nhất mà mình biết đến là dùng để chứa các fragments và có thể lướt ngang giữa các fragments.
- BottomNavigationView: là một thanh điều hướng ở phía dưới layout (không phải thanh điều hướng của điện thoại).
- SwipeRefreshLayout: cung cấp cho ListView chức năng lướt xuống để refresh.
- etc...

Ví dụ về một thành phần EditText trong XML file:

    <EditText
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:id="@+id/tvLookUpContent"
        android:background="@drawable/edittext"
        android:layout_toEndOf="@+id/btnClose"
        android:layout_marginStart="5dp" />

## Layouts
## ListView, GridView và Spinner
## Animations
## Activity
## Fragment
## Intent
## SQLite
## Broadcast Receiver
## MultiThreading
## AsyncTask
## Gọi API trong Android Studio

## Tài liệu tham khảo
1. [Android Studio](https://vi.wikipedia.org/wiki/Android_Studio)
2. [XML](https://vi.wikipedia.org/wiki/XML)

[writtenDay]: <09/07/2024>