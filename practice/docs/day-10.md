# Day 10: Logout vs Authentication

---

## SUMMARY

Authentication middleware

Logout feature

---

## NOTES

- Authentication function: @src/auth/authUtils.js
  - authentication function
  - Add @src/helpers/asyncHandler.js
  - update @src/services/keyToken.service.js - findByUserId
  - @src/routes/access/index.js
    ```javascript
    router.use(authentication);
    ```
  - test
    ```http
    ### logout
    POST {{url_dev}}/shop/logout
    Content-Type: application/json
    x-api-key: {{keyStore._id}}
    x-client-id: {{metadata.shop._id}}
    authorization: {{metadata.tokens.accessToken}}
    ```
- Logout feature
  - update @src/services/access.service.js
  - update @src/services/keyToken.service.js
    - removeKeyById
  - update @src/controllers/access.service.js
    - req.keyStore được lấy từ hàm xử lý middleware authentication (req.keyStore = keyStore) - line 68
  - update @src/routes/access/index.js 
    - logout function
  - test
    ```http
    ### logout
    POST {{url_dev}}/shop/logout
    Content-Type: application/json
    x-api-key: {{keyStore._id}}
    x-client-id: {{metadata.shop._id}}
    authorization: {{metadata.tokens.accessToken}}
    
    HTTP/1.1 200 OK
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
    Content-Length: 97
    ETag: W/"61-UKQY1zTzm6UK9F2YLDeu4I1ux94"
    Vary: Accept-Encoding
    Date: Sun, 30 Aug 2026 16:07:07 GMT
    Connection: close
    
    {
      "message": "Logout successfully!",
      "status": 200,
      "metadata": {
        "acknowledged": true,
        "deletedCount": 1
      }
    }
    ```
- 

---



&nbsp;