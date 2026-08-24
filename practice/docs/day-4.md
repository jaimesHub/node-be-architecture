# Day 4: Lịch sử của `.env` và cách kết hợp **env & configs** cho dự án **nhiều** môi trường & members

---

## SUMMARY

1. Tìm hiểu về `.env` file
2. Vì sao nên dùng `.env` file ? Nếu không dùng thì sao ?
3. Phân biệt `.env` file và `config` file khác nhau như thế nào ? (Để sử dụng hợp lý cho dự án)
4. Thực hành về việc `config` file có thể linh hoạt giữa `local` , `cloud` và `team` thì cần xử lý `.env` file như thế nào ?

---

## Notes

1. Tìm hiểu về `.env` file
  1. Làm sao dễ dàng viết / triển khai trên local / cloud / team
  2. Dễ dàng triển khai DB cho các môi trường khác nhau mà không cần đổi codebase
  3. Mỗi dev có thể đặt theo ý riêng mà không ảnh hưởng toàn bộ dự án
  4. Lưu trữ biến môi trường: khoá API, string url CSDL, ...
2. Vì sao nên dùng `.env` file ? Nếu không dùng thì sao ?
  1. Tách biệt thông tin nhạy cảm khỏi codebase , clean code, dễ maintain
  2. Hoàn toàn có thể không cần đến file này cũng được, nhưng không chuyên nghiệp và best practice cho lắm
3. Phân biệt `.env` file và `config` file khác nhau như thế nào ?
  1. `config` files được sử dụng để lưu trữ, cài đặt và tuỳ chọn file cấu hình của dự án. Được lưu ở dưới định dạng json/xml -> Chính: kiểm soát , lưu trữ những cài đặt ứng dụng của dự án mà có thể kiểm soát được codebase, phiên bản
  2. `.env` files được dùng để lưu trữ thông tin nhạy cảm
  3. Lưu ý: Đảm bảo không lưu trữ thông tin nhạy cảm ở trong các files `config`
4. Thực hành về việc `config` file có thể linh hoạt giữa `local` , `cloud` và `team` thì cần xử lý `.env` file như thế nào ?
  - PRE: `npm i dotenv --save-dev`
  - Add params at @.env file 
  - Bao gồm 3 levels khác nhau
    - Level 0: local 
      - @src/app.js : 
      - Code
        ```javascript
        console.log('>>> PROCESS:: ', process.env);
        // NODE_ENV=level0 node server.js
        ```
      - using `dotenv`
        ```javascript
        require('dotenv').config();
        // update .env
        // PORT=3052
        // check server.js for PORT
        // node server.js
        ```
      - @src/configs/config.mongodb.js:
        ```javascript
        // level 0
        // ...
        ```
    - Level 1: cloud/vps 
      - @src/configs/config.mongodb.js
        ```javascript
        // level 1
        // const dev = {...}
        // const prod = {...}
        ```
    - Level 2: team
      - @src/configs/config.mongodb.js
        ```javascript
        // level 2
        // using `process.env.X`
        ```

