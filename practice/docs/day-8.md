# Day 8: Make Your API Response use class

---

## SUMMARY

Tìm hiểu cách tạo class SuccessResponse cho việc thống nhất ngữ cảnh của 1 doanh nghiệp/công ty/team 

---

## NOTES

1. phân tích return success response logic: @src/controllers/access.controller.js -&gt; chưa được best practice
2. update @src/core/success/response.js
  1. class SuccessResponse
  2. class OK
  3. class Created
3. update @src/controllers/access.controller.js
4. test @src/postman/access.post.http
  ```http
  POST {{url_dev}}/shop/signup
  Content-Type: application/json
  x-api-key: ad0fc0ee85ec0e49e5e5bc3639ae1ef73dec21571f9c9f89888329a468a777c6083ea43a632ef1e9d923e8c2e2b5e1621b51e00c10b67b32cd7f6350ba8b4c73
  
  {
    "name": "Shop Dev 4",
    "email": "shopdev4@example.com",
    "password": "password123"
  }
  
  HTTP/1.1 201 Created
  Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  Origin-Agent-Cluster: ?1
  Referrer-Policy: no-referrer
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-DNS-Prefetch-Control: off
  X-Download-Options: noopen
  X-Frame-Options: SAMEORIGIN
  X-Permitted-Cross-Domain-Policies: none
  X-XSS-Protection: 0
  Content-Type: application/json; charset=utf-8
  Content-Length: 717
  ETag: W/"2cd-eiIdDf60CBDUP+7QDLxwKE1eSkk"
  Vary: Accept-Encoding
  Date: Fri, 28 Aug 2026 07:41:54 GMT
  Connection: close
  
  {
    "message": "Register Shop Successfully!",
    "status": 201,
    "metadata": {
      "code": 201,
      "status": "created",
      "metadata": {
        "shop": {
          "_id": "6a913bc2d456a7ee3156c462",
          "name": "Shop Dev 4",
          "email": "shopdev4@example.com"
        },
        "tokens": {
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTkxM2JjMmQ0NTZhN2VlMzE1NmM0NjIiLCJlbWFpbCI6InNob3BkZXY0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzg3OTAyOTE0LCJleHAiOjE3ODgwNzU3MTR9.8a8dw3vVw8C7cbaWzUCy4BzpCb4PNd59QpOHF_TusBk",
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTkxM2JjMmQ0NTZhN2VlMzE1NmM0NjIiLCJlbWFpbCI6InNob3BkZXY0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzg3OTAyOTE0LCJleHAiOjE3ODg1MDc3MTR9.gzAFhMy9MzW5Lf6EGmjusCCRUL9acjHIhs2tF1oZdH0"
        }
      },
      "message": "Sign up successfully!"
    }
  }
  ```
5. add more information response ( `options` ) for @src/controllers/access.controller.js
  ```javascript
          new CreatedResponse({
              message: 'Register Shop Successfully!',
              metadata: await AccessService.signUp(req.body),
              options: {
                  limit: 10,
              }
          }).send(res);
  ```

---



&nbsp;