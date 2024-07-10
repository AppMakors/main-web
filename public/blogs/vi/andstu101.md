# Android Studio 101
**Bài blog này bao gồm những kiến thức cơ bản về Android Studio được tổng hợp sau môn học Phát triển ứng dụng trên thiết bị di động.**

Sớm hơn dự tính, trong học kỳ II của năm hai đại học mình đã được học môn Phát triển ứng dụng trên thiết bị di động với mã môn là NT118. Tuy nhiên, nếu đúng với lộ trình học thì mình sẽ được học môn này ở học kỳ I năm ba. Mình không khuyến khích các bạn học môn này sớm hơn dù chỉ là một học kỳ, bởi vì nó không hề dễ dàng. Theo lời khuyên của cô mình thì môn này nên được học ở học kỳ II năm ba hoặc học kỳ I năm tư.

Trong sơ đồ môn học (sơ đồ kế hoạch giảng dạy) có để môn học trước môn này là Lập trình hướng đối tượng, tuy nhiên mình thấy điều này chưa đúng lắm. Theo mình, để học được môn học này thì chúng ta cần tối thiểu 2 môn học trước là Lập trình hướng đối tượng và Lập trình mạng căn bản. Và thêm môn học Quản trị mạng và hệ thống nếu đồ án của các bạn có triển khai (deployment).

Bài viết này chủ yếu mình sẽ chỉ đưa ra những khái niệm, những kiến thức cơ bản để các bạn có thể tự tìm hiểu, vì việc đưa code vào và giải thích code sẽ khiến bài viết này rất dài.

## Mục lục
- [Android Studio 101](#android-studio-101)
  - [Mục lục](#mục-lục)
  - [Android Studio](#android-studio)
  - [XML file trong Android Studio](#xml-file-trong-android-studio)
  - [Components](#components)
  - [Layouts](#layouts)
  - [ListView, GridView và RecyclerView](#listview-gridview-và-recyclerview)
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
	- **Các file .java:** các file vận hành.
	- **Các file .xml:** có thể là một layout hoặc là một file resource, animation,...
	- **File build.gradle:** khai báo các dependencies, plugins,...

- Quy tắc đặt tên các file .java trong Android Studio:
    - **Một activity:** NameActivity.java
    - **Một fragment:** NameFragment.java

- Quy tắc đặt tên các file XML trong Android Studio:
    - **Layout cho một Activity:** activity_name.xml
    - **Layout cho một Fragment:** fragment_name.xml
    - **Layout cho một item:** item_name.xml
    - **Cho một animation:** anim_name.xml

## XML file trong Android Studio
Định nghĩa XML:
- **Wikipedia:** XML (viết tắt từ tiếng Anh: eXtensible Markup Language, tức "Ngôn ngữ đánh dấu mở rộng") là ngôn ngữ đánh dấu với mục đích chung do W3C đề nghị, để tạo ra các ngôn ngữ đánh dấu khác.
- **Theo mình hiểu:** XML và HTML có bản chất giống nhau, vì cả 2 đều là Markup Language (ngôn ngữ đánh dấu). Cách sử dụng XML trong Android Studio cũng giống như cách sử dụng HTML trong WebDev. File XML trong Android Studio có thể làm được khá nhiều thứ:
    - Dùng để thiết kế các layout cho một Activity, Fragment, item trong ListView hoặc 1 dialog.
    - Dùng để ánh xạ từ một ID sang một giá trị String cụ thể (file strings.xml).
    - Dùng để ánh xạ từ một ID sang một giá trị đo lường cụ thể (file dimens.xml).
    - Dùng để thiết kế các animations cho một component hoặc cho chuyển động giữa các activities, fragments (folder anim).

Về phần cách sử dụng các file XML cụ thể, các bạn có thể xem các ví dụ trong mục [Components](#components), [Layouts](#layouts), [ListView, GridView và Spinner](#listview-gridview-và-spinner), [Animations](#animations).

## Components
Các thành phần (components) trong một layout là một đối tượng UI hiển thị trên layout mà người dùng có thể nhìn thấy hoặc thao tác được.

Các thành phần cơ bản trong một layout:
- **EditText:** text có thể chỉnh sửa.
- **TextView:** text dùng để hiển thị.
- **Button:** nút dùng để bấm.
- **ImageView:** hiển thị một hình ảnh.
- **ImageButton:** là một cái nút nhưng có thể hiển thị hình ảnh.
- **CheckBox:** ô vuông dùng để check.
- **ProgressBar:** hiển thị tiến độ công việc.

Các thành phần nâng cao trong một layout:
- **ViewPager2:** có rất nhiều công dụng, tuy nhiên công dụng duy nhất mà mình biết đến là dùng để chứa các fragments và có thể lướt ngang giữa các fragments.
- **BottomNavigationView:** là một thanh điều hướng ở phía dưới layout (không phải thanh điều hướng của điện thoại).
- **SwipeRefreshLayout:** cung cấp cho ListView chức năng lướt xuống để refresh.

Ví dụ về một thành phần EditText trong XML file:
```xml
<EditText
    android:layout_width="match_parent"
    android:layout_height="50dp"
    android:id="@+id/tvLookUpContent"
    android:layout_marginStart="5dp" />
```

## Layouts
Để cho ứng dụng của chúng ta có một giao diện đẹp thì không thể thiếu các layouts, trong một giao diện có thể có nhiều layouts, trong một layout có thể có nhiều components và có thể căn chỉnh tùy theo ý muốn của người phát triển. Vì vậy, sau đây mình xin đưa ra một vài các layout mà mình đã được học:

- Các layouts thường được dùng:
    - **Linear layout:** cung cấp cho chúng ta các thuộc tính để sắp xếp các thành phần trong layout thành chiều dọc (vertical) hoặc chiều ngang (horizontal).
    - **Relative layout:** đây là loại layout cho phép chúng ta thiết lập mối liên hệ hiển thị giữa các thành phần con với nhau.
    - **Constraint layout:** là một layout mạnh, khuyến khích sử dụng vì nó giúp tạo ra các giao diện phức tạp, mềm dẻo (hạn chế tối đa sử dụng các layout lồng nhau). Theo mình thấy thì layout này giống với Relative Layout, tuy nhiên nó có độ mềm dẻo cao hơn một tí.
- Các layout hiếm khi được sử dụng:
    - **Frame layout:** đơn giản là vùng hiển thị 1 nội dung cụ thể nào đó. Nó chứa trong nó 1 thành phần view khác như 1 hình ảnh, 1 nút nhấn, 1 nhãn.
    - **Table layout:** layout này ở bài thực hành có đề cập tới, tuy nhiên chỉ là ở phần ví dụ, nên mình chưa hiểu rõ lắm.
    - **Grid layout:** layout này được mình nghiên cứu thêm ở trên mạng, mình cũng chưa hiểu rõ nên mình chỉ để từ khóa ở đây cho các bạn tự tìm hiểu nhé.
- Kinh nghiệm rút ra:
    - Khi thiết kế layout cho một Activity hoặc một Fragment thì việc sử dụng Relative Layout hoặc Constraint Layout là khuyến khích. Để các thành phần có thể tự căn chỉnh khi người dùng xoay ngang điện thoại, hoặc tự căn chỉnh trên các điện thoại có tỉ lệ màn hình khác nhau.
    - Đối với việc thiết kế một item cho một List View thì nên sử dụng Linear Layout. Vì thường một item sẽ là một hàng ngang có các thành phần được xếp từ trái qua phải hoặc từ phải qua trái nên khi dùng Linear Layout sẽ dễ dàng hơn.

Ví dụ về một RelativeLayout với hai TextView ở trong:
```xml
<RelativeLayout
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/textView1"
        android:text="textView1"/>

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/textView2"
        android:text="textView2"/>
</RelativeLayout>
```

## ListView, GridView và RecyclerView
Thực chất thì ListView, GridView và RecyclerView cũng chỉ là các thành phần như những thành phần đã được đề cập ở mục [Components](#components). Tuy nhiên, mình tách chúng ra một mục riêng bởi vì chúng khá quan trọng. Các bạn thử để ý xem, trong các ứng dụng trên thiết bị di động hiện nay, chắc chắc rằng ứng dụng nào cũng phải sử dụng ListView (dùng để hiển thị một danh sách dạng từng hàng). Vì vậy, hãy cùng đi vào tìm hiểu cùng mình nhé.

- Khái niệm:
    - **Item:** một item trong ListView, GridView hoặc RecyclerView có thể là một hàng, một ô hoặc một cái gì đó tùy theo người phát triển custom.
    - **ListView:** dùng để hiển thị một danh sách dạng từng hàng.
    - **GridView:** dùng để hiển thị một danh sách dạng từng ô.
    - **RecyclerView:** đây là một dạng ListView thường được sử dụng để hiển thị một item có chứa lượng dữ liệu khá lớn ở trong (ví dụ như item có chứa một hình ảnh). Công dụng của nó là như thế bởi vì nó có tính "tái chế" (đúng như cái tên của nó). Nó "tái chế" bằng cách sử dụng các ViewHolder để giữ các items và có thể sử dụng lại.
    - **Adapter:** mỗi một ListView, GridView hoặc RecyclerView đều cần phải khởi tạo một Adapter mới có thể sử dụng được. Hiểu đơn giản thì Adapter sẽ xử lý những công việc mà chúng ta muốn làm khi ListView có một item mới được thêm vào. Điều đó giúp ta có thể custom ListView theo ý muốn của chúng ta.
- Ví dụ về cách khởi tạo và sử dụng một ListView:
    - [ListView - Android Studio Document](https://developer.android.com/reference/android/widget/ListView)
    - [ListView và Custom Adapter - howkteam](https://howkteam.vn/course/khoa-hoc-lap-trinh-android-co-ban/listview-va-custom-adapter-119)
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