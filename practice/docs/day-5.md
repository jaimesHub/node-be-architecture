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
- npm install jsonwebtoken --save
- npm i lodash --save

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
6. add `keyToken` model: @src/models/keyToken.model.js
  1. saving: userId, publicKey, refreshToken (used)
7. key service: @src/services/keyToken.service.js
  1. create token function
  2. update @src/services/access.service.js
    ```javascript
    const publicKeyString = await KeyTokenService.createKeyToken({ userId: newShop._id, publicKey });
    ```
  3. add @src/auth/authUtils.js
    1. npm install jsonwebtoken --save
    2. createTokenPair (payload, publicKey, privateKey)
      ```javascript
      // create access token using private key
      // create refresh token using private key
      // verify token using public key
      ```
    3. update @src/access.service.js
      ```javascript
      // create tokens (accessToken, refreshToken) for shop - using privateKey to sign tokens
      // step: return result
      ```
    4. Test: update @src/postman/access.post.http
      ```http
      @url_dev=http://localhost:3052/v1/api
      
      ### signup
      POST {{url_dev}}/shop/signup
      Content-Type: application/json
      
      {
        "name": "Shop Name",
        "email": "shop@example.com",
        "password": "password123"
      }
      ```
  4. update @src/app.js
    1. app.use(express.json());
    2. app.use(express.urlencoded({ extended: true }));
  5. update @src/controllers/access.controller.js (AccessController)
    ```javascript
    const result = await AccessService.signUp(req.body);
    return res.status(result.code).json({
      code: result.code,
      metadata: result.metadata,
      message: result.message,
    });
    ```
8. Update return response while create a new shop instance
  1. npm i lodash --save
  2. @src/utils/index.js
  3. getInfoData
  4. update @src/services/access.service.js
    ```javascript
    // step: return result
    return {
      code: 201,
      status: 'created',
      metadata: {
      shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
        tokens,
      },
      message: 'Sign up successfully!',
    }
    ```
9. Update @src/services/access.service.js
  ```javascript
                  // create privateKey - sending to user after creating for signing tokens, DO NOT store privateKey in database/system
                  // create publicKey - saving in database/system for verifying tokens, DO NOT send publicKey to user
                  // why? - hacker can not generate valid tokens without privateKey, and hacker can not verify tokens without publicKey
                  // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                  //     modulusLength: 4096,
                  //     publicKeyEncoding: {
                  //         type: 'pkcs1',
                  //         format: 'pem',
                  //     },
                  //     privateKeyEncoding: {
                  //         type: 'pkcs1',
                  //         format: 'pem',
                  //     },
                  // });
  
                  // using a simpler way to generate privateKey, publicKey
                  const privateKey = crypto.getRandomValues(64).toString('hex');
                  const publicKey = crypto.getRandomValues(64).toString('hex');
  
                  // ...
                  // save publicKey to database
                  const publicKeyString = await KeyTokenService.createKeyToken({
                      userId: newShop._id,
                      publicKey,
                      privateKey,
                  });
  ```
10. Update @src/services/keyToken.service.js
  ```javascript
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
          try {
              const tokens = await keyTokenModel.create({
                  user: userId,
                  publicKey,
                  privateKey,
              });
              return tokens ? tokens.publicKey : null;
          } catch (error) {
              return error;
          }
      }
  ```
11. Update @src/models/keytoken.model.js
  ```javascript
      // ...
      privateKey: {
          type: String,
          required: true,
      },
      // ...
  ```
12. Update @src/auth/index.js
  ```javascript
        // create access token using publicKey key
          const accessToken = await JWT.sign(payload, publicKey, {
              expiresIn: '2 days',
          });
        // ...
  ```
13.  Test: Using @src/postman/access.post.http

---

SUMMARY

1. Sign-up SHOP: business logic flow 
2. JWT with RSA: how to create JWT access token &amp; refresh token using the way RSA works
3. JWT: saving pem file into MongoDB &amp; decode it
4. Separate modules for using flexible ways

