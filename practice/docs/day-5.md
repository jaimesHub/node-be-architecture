# Day 5: Api Sign-up Shop

---

PRE

- @practice/docs/manual-workflow.md
- @STATUS.md 
- @practice/docs/day-5.md
- colima list | colima start
- nvm use v19.1.0
- install extension: `Mongo Snippets for Node-js`  
- extensions:  REST Client / HTTP Client (Marcel J. Kloubert), import cost
- `npm install bcrypt --save`

---

NOTES

1. create `SHOP` model: @src/models/shop.model.js
  ```javascript
  // key !dmbg generated schema quickly by Mongo Snippets for Node-js
  // shopSchema
  ```
2. setup API routes:
  1. @src/routes/index.js - where imports all of routes which belong to application
  2. @src/routes/access/index.js - where manages sign up, log in , refresh token, save token  (import &amp; use `controllers` packages)
  3. @src/controllers/access.controller.js - where manages functions (business logics) of a specific module (example: access, shop, ...)
  4. @src/app.js - // init routes - update importing main routes @src/routes/index.js
3. test API: @src/postman
  1. @src/postman/access.post.http
4. shop module: @src/routes/shop - writing `signup` function
  1. @src/routes/shop/index.js - create file
  2. @src/services/access.service.js - writing `signup` function
  3. `npm install bcrypt --save`
  4. 
5. update @src/postman/access.post.http
  ```http
  @url_dev=http://localhost:3052/v1/api
  POST {{url_dev}}/shop/signup
  ```
6. add `keytoken` model: @src/models/keytoken.model.js - TBD
  1. save userId, publicKey, refreshToken 

