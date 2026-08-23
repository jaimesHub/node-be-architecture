# Day 3: Connect MongoDB to Node.js Using Mongoose và 7 điều cần triển khai trong hệ thống

---

## Summary

1. Nhược điểm của cách CONNECT cũ
2. Cách CONNECT MỚI, khuyên dùng
3. Kiểm tra hệ thống có bao nhiêu CONNECT ?
4. Thông báo khi server QUÁ TẢI connect
5. Có nên `disConnect()` liên tục hay không ?
6. PoolSize là gì ? Vì sao lại quan trọng ?
7. Nếu vượt quá kết nội PoolSize ?

---

## NOTES

PRE: npm i mongoose --save-dev | brew install [mongodb-community@7.0](mailto:mongodb-community@7.0) | Colima for Docker (Colima 0.10.3)

More detail:

- colima start --vm-type=vz --cpu 2 --memory 4 --disk 20  — dùng Virtualization.framework, docker context tự chuyển sang colima.
- Chạy container: docker run -d --name mongo7 --restart unless-stopped -p 27017:27017 -v mongo7-data:/data/db mongo:7 — data nằm ở volume mongo7-data nên không mất khi xoá container.
- Sửa connection string trong src/dbs/*.js: localhost → 127.0.0.1 (3 file: init.mongodb.js:10, init.mongodb.lv0.js:5, poolSize.mongodb.js:10). Node 19 phân giải localhost ra ::1 trước, mà Colima chỉ forward cổng qua IPv4 → nếu để localhost sẽ dính ECONNREFUSED ::1:27017.
- Lệnh cần nhớ:
  ```bash
  colima start                          # bật VM (sau khi khởi động lại máy)
  colima stop                           # tắt VM, giải phóng RAM
  docker ps                             # xem container
  docker exec -it mongo7 mongosh        # mở mongosh (không cần cài mongosh trên máy)
  Container có --restart unless-stopped nên tự chạy lại mỗi khi colima start. Nếu muốn Colima tự bật lúc đăng nhập: brew services start colima.
  ```
- NOTE: mongodb-database-tools đã cài xong từ trước (mongodump/mongorestore dùng được). Đừng chạy brew install mongodb-community nữa — trên máy này bất kỳ formula nào kéo theo node hay llvm đều phải compile hàng tiếng. Tôi đã ghi lại ràng buộc môi trường này vào memory của project.

1. Nhược điểm của cách CONNECT cũ
  - @src/dbs/init.mongodb.lv0.js
  - @src/app.js -&gt; //init db -&gt; import src/dbs/init.mongodb.lv0.js
  - run test: node --watch server.js (at @practice/ folder)
2. Cách CONNECT MỚI, khuyên dùng (using `SINGLETON` design pattern)
  - @src/dbs/init.mongodb.js
  - @src/app.js -&gt; //init db -&gt; import src/dbs/init.mongodb.js
  - run test: node --watch server.js (at @practice/ folder)
3. Kiểm tra hệ thống có bao nhiêu CONNECT ?
  - @src/helpers/
    - check.connect.js (countConnect)
    - C1: test tại @src/app.js
    - C2: test tại @src/dbs/init.mongodb.js (sau khi connect DB thành công)
  - phân biệt `helper` và `utils` - về giá trị thì khác nhau 
    - utils: chứa những files viết về functions , ví dụ: chuyển đổi ký tự hoa sang ký tự thường, chuyển đổi kiểu int sang string , tần suất sử dụng (trong CODING) khi nào cần mới gọi 
    - helpers: 1 uỷ quyền, 1 file giúp chúng ta có thể làm nhiều việc hơn , tần suất sử dụng (trong CODING) NHIỀU
4. Thông báo khi server QUÁ TẢI connect
  - @src/helpers/
    - check.connect.js (checkOverload)
  - C1: test tại @src/app.js
5. Có nên `disConnect()` liên tục hay không ?
  - Không cần đóng liên tục theo cách thủ công 
  - vì mongodb có sử dụng 1 pool - 1 nhóm kết nối để quản lý CSDL, xử lý đóng-mở connections tự động khi cần 
  - nếu muốn đóng-mở rõ ràng: dùng `process.on`
6. PoolSize là gì ? Vì sao lại quan trọng ?
  - @src/dbs/poolSize.mongodb.js
  - what ?
  - lợi ích ?
7. Nếu vượt quá kết nội PoolSize ?
  - @src/dbs/poolSize.mongodb.js
  - mongoose sẽ hoạt động như thế nào trong trường hợp này 
  - tăng `maxPoolSize` sẽ dựa vào CPU, Memory của máy tính/server dự án để xem xét

