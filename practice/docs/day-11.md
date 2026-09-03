# Day 11: Xử lý token được sử dụng trái phép và cách xử lý | RefreshToken

---

## SUMMARY

Video cần xem: [https://youtu.be/1HHvCfAu008?si=zKMi6TQqbdsvfSY6](https://youtu.be/1HHvCfAu008?si=zKMi6TQqbdsvfSY6)

Viết service handle refresh token 

---

## NOTES

1. update @src/services/access.service.js : handlerRefreshToken function
  1. based on `refreshTokenUsed` field at @src/models/keyToken.model.js
  2. based on `verifyJWT` function at @src/auth/authUtils.js
2. update @src/services/keyToken.service.js: `findByRefreshTokenUsed` , `findByRefreshToken` functions
3. update @src/auth/authUtils.js: verifyJWT function, deleteKeyById
4. test
  1. update @src/controllers/access.controller.js: handleRefreshToken function
  2. update @src/routes/access/index.js
    ```javascript
    router.post('/shop/refresh-token', asyncHandler(accessController.handleRefreshToken));
    ```
  3. run docker first
    ```bash
    colima start --vm-type=vz --cpu 2 --memory 4 --disk 20
    ```
  4. postman
    1. login
    2. refresh-token
    3. checkdb
      1. docker exec -it mongo7 mongosh
      2. use dbDev
      3. db.Keys.find()
    4. refresh-token again to get 403
    5. checkdb again
      1. use dbDev
      2. db.Keys.find()

---

