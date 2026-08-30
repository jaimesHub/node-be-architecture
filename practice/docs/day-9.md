# Day 9: Login Shop Api

---

## SUMMARY

Hoàn thành các tasks chính như: Login, Logout 

Làm rõ 1 số khái niệm: Access Token, Refresh Token

Làm thế nào để lưu 1 family token ?

---

## NOTES

- update @src/services/access.service.js
  - login function
    ```javascript
    static login = async ({ email, password, refreshToken = null }) => {};
    ```
  - steps
    ```javascript
     /**
         *  steps
         *   1. check email in DB
         *   2. match password
         *   3. create accessToken, refreshToken and save to DB
         *   4. generate tokens
         *   5. get data return login
         */
    ```
  - update
- add @src/services/shop.service.js
- status codes: [https://github.com/anonystick/httpStatusCode](https://github.com/anonystick/httpStatusCode) 
  - add @src/utils/statusCodes.js 
  - add @src/utils/reasonPhrases.js 
  - add @src/utils/httpStatusCode.js 
- update @src/core/error.response.js
  ```javascript
  class AuthFailureError extends ErrorResponse
  ```
- update @src/services/keyToken.service.js
  ```javascript
  // level advanced: atomic in DB
  ```
- update @src/models/keyToken.model.js
  ```javascript
      refreshTokensUsed:{
          type: Array,
          default: [],
      },
      refreshToken: {
          type: String,
          required: true,
      },
  ```
- update @src/controllers/access.controller.js
  ```javascript
  login = async (req, res, next) => {}
  ```
- update @src/routes/access/index.js
  ```javascript
  router.post('/shop/login', asyncHandler(accessController.login));
  ```
- test @src/postman/access.post.http
  ```http
  ### login
  POST {{url_dev}}/shop/login
  Content-Type: application/json
  x-api-key: ad0fc0ee85ec0e49e5e5bc3639ae1ef73dec21571f9c9f89888329a468a777c6083ea43a632ef1e9d923e8c2e2b5e1621b51e00c10b67b32cd7f6350ba8b4c73
  
  {
    "email": "shopdev2@example.com",
    "password": "password123"
  }
  ```
- check collection `keyToken` : refreshTokenUsed, refreshToken, user, privateKey, publicKey

---



&nbsp;