# Day 6: Custom Dynamic Middleware for ApiKey and Permissions

---

## NOTES

1. Hệ thống: Kiểm tra API có đang sử dụng đúng VERSION hay chưa ?
  1. Check bằng API_KEY
    1. @src/models/apiKey.model.js - Lưu trữ token theo ngày-tháng
    2. permissions: cung cấp cho nhiều kiểu user khác nhau (được add vào header khi request)
    3. middleware: @src/auth/checkAuth.js
    4. services: @src/services/apiKey.service.js
    5. update @src/routes/index.js
      ```javascript
      // check apiKey
      router.use(apiKey);
      ```
    6. test:
      1. @src/postman/access.post.http:
        ```
        x-api-key: 123456789
        ```
      2. @src/services/apiKey.service.js: create test x-api-key
        ```javascript
        // TESTING PURPOSES
        ```
  2. Check permission KEY trên có được quyền truy cập vào HỆ THỐNG BE không ?
    1. update @src/auth/checkAuth.js
    2. update @src/routes/index.js
    3. test

---

## SUMMARY

1. Check bằng API_KEY
2. Check permission truy cập vào HỆ THỐNG BE

