# Day 7: Xử lý ErrorHandler trong API

---

## NOTES

1. Handle 404 Error at @src/app.js
  1. (err, req, res, next) =&gt; {} : hàm xử lý lỗi
  2. (req, res, next) =&gt; {} : middleware function
  3. test: @src/postman/access.post.http
2. Handle Errors in routers
  1. add @src/core/error.response.js , @src/core/success.response.js
  2. update @src/services/access.service.js
  3. update @src/controllers/access.controller.js
  4. write middleware for handling errors at route @src/routes/access/index.js
    1. asyncHandler function at @src/auth/checkAuth.js
    2. @src/routes/access/index.js
      ```javascript
      router.post('/shop/signup', asyncHandler(accessController.signUp));
      ```
  5. Test @src/postman/access.post.http

---

## SUMMARY

1. Handle Errors out of routers
2. Handle Errors in routers

---



&nbsp;